import { expect, test, type APIRequestContext } from "@playwright/test";

const API_BASE_URL = process.env.E2E_API_BASE_URL || "http://localhost:8080";

async function registerTenant(request: APIRequestContext) {
  const adminEmail = `e2e-${Date.now()}@example.com`;
  const adminPassword = "e2e-password";
  const res = await request.post(`${API_BASE_URL}/api/v1/auth/tenants`, {
    data: {
      tenantName: `E2E Tenant ${Date.now()}`,
      countryCode: "PE",
      adminEmail,
      adminPassword,
    },
  });
  expect(res.ok()).toBeTruthy();
  return { adminEmail, adminPassword };
}

test("login, create warehouse/section/product, record a movement, see it in stock", async ({
  page,
  request,
}) => {
  const { adminEmail, adminPassword } = await registerTenant(request);

  await page.goto("/login");
  await page.getByLabel(/email/i).fill(adminEmail);
  await page.getByLabel(/password/i).fill(adminPassword);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/warehouses$/);

  const warehouseName = `E2E Warehouse ${Date.now()}`;
  await page.getByLabel(/^name$/i).fill(warehouseName);
  await page.getByLabel(/^code$/i).fill("E2E-WH");
  await page.getByLabel(/ruc establishment code/i).fill("0001");
  const [createWhResponse] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/api/v1/warehouses") && r.request().method() === "POST"
    ),
    page.getByRole("button", { name: /add warehouse/i }).click(),
  ]);
  const warehouse = await createWhResponse.json();

  await page.getByText(`${warehouseName} (E2E-WH)`).click();
  await page.getByLabel(/section name/i).fill("E2E Section");
  await page.getByLabel(/section code/i).fill("E2E-SEC");
  const [createSecResponse] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().includes(`/api/v1/warehouses/${warehouse.id}/sections`) &&
        r.request().method() === "POST"
    ),
    page.getByRole("button", { name: /add section/i }).click(),
  ]);
  const section = await createSecResponse.json();

  await page.goto("/products");
  await page.getByRole("button", { name: /new product/i }).click();
  const sku = `E2E-SKU-${Date.now()}`;
  await page.getByLabel(/^sku$/i).fill(sku);
  await page.getByLabel(/^name$/i).fill("E2E Product");
  await page.getByLabel(/unit of measure code/i).fill("NIU");
  await page.getByRole("button", { name: /^create$/i }).click();
  await expect(page.getByText("E2E Product")).toBeVisible();

  await page.goto("/stock/movements/new");
  await page.getByLabel(/product sku/i).fill(sku);
  await page.getByLabel(/warehouse id/i).fill(warehouse.id);
  await page.getByLabel(/section id/i).fill(section.id);
  await page.getByLabel(/quantity/i).fill("50");
  await page.getByLabel(/unit cost/i).fill("9.99");
  await page.getByRole("button", { name: /record movement/i }).click();
  await expect(page.getByText("Movement recorded.")).toBeVisible();

  await page.goto(`/products/${sku}`);
  await expect(page.getByText("IN")).toBeVisible();
  await expect(page.getByText("50")).toBeVisible();
});
