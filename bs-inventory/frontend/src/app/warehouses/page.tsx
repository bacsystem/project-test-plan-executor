"use client";

import { type FormEvent, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  createSection,
  createWarehouse,
  listSections,
  listWarehouses,
  type Section,
  type Warehouse,
} from "@/lib/apiClient";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [rucCode, setRucCode] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [sectionCode, setSectionCode] = useState("");

  async function refreshWarehouses() {
    setWarehouses(await listWarehouses());
  }

  useEffect(() => {
    refreshWarehouses();
  }, []);

  async function handleCreateWarehouse(e: FormEvent) {
    e.preventDefault();
    await createWarehouse({ name, code, rucEstablishmentCode: rucCode });
    setName("");
    setCode("");
    setRucCode("");
    await refreshWarehouses();
  }

  async function selectWarehouse(id: string) {
    setSelectedId(id);
    setSections(await listSections(id));
  }

  async function handleCreateSection(e: FormEvent) {
    e.preventDefault();
    if (!selectedId) return;
    await createSection(selectedId, { name: sectionName, code: sectionCode });
    setSectionName("");
    setSectionCode("");
    setSections(await listSections(selectedId));
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Warehouses
      </Typography>

      <Box component="form" onSubmit={handleCreateWarehouse} sx={{ display: "flex", gap: 1, mb: 3 }}>
        {/* No `required` prop: MUI renders a "*" inside the label text, which breaks
            anchored label lookups (e.g. /^name$/i) in tests and screen readers alike. */}
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} size="small" />
        <TextField label="Code" value={code} onChange={(e) => setCode(e.target.value)} size="small" />
        <TextField
          label="RUC establishment code"
          value={rucCode}
          onChange={(e) => setRucCode(e.target.value)}
          size="small"
        />
        <Button type="submit" variant="contained">
          Add warehouse
        </Button>
      </Box>

      <List>
        {warehouses.map((w) => (
          <ListItemButton key={w.id} selected={w.id === selectedId} onClick={() => selectWarehouse(w.id)}>
            <ListItemText primary={`${w.name} (${w.code})`} />
          </ListItemButton>
        ))}
      </List>

      {selectedId && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Sections</Typography>
          <List>
            {sections.map((s) => (
              <ListItemText key={s.id} primary={`${s.name} (${s.code})`} />
            ))}
          </List>
          <Box component="form" onSubmit={handleCreateSection} sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Section name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              size="small"
            />
            <TextField
              label="Section code"
              value={sectionCode}
              onChange={(e) => setSectionCode(e.target.value)}
              size="small"
            />
            <Button type="submit" variant="outlined">
              Add section
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
