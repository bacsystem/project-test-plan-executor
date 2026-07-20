"use client";

import Link from "next/link";

import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiSearch from "@/icons/nexture/ni-search";

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid container spacing={2.5} className="w-full" size={12}>
          <Grid size={{ md: "grow", xs: 12 }}>
            <Typography variant="h1" component="h1" className="mb-0">
              Models
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/applications">
                Applications
              </Link>
              <Link color="inherit" href="/applications/ai-content">
                AI Content
              </Link>
              <Typography variant="body2">Models</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={{ xs: 12 }}>
          <FormControl variant="filled" size="medium" className="surface mb-0" fullWidth>
            <InputLabel>Search</InputLabel>
            <FilledInput
              defaultValue=""
              placeholder="Type to search projects..."
              endAdornment={
                <>
                  <InputAdornment position="end">
                    <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                  </InputAdornment>
                </>
              }
            />
          </FormControl>
        </Grid>

        <Grid size={12} container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-1.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Animerge
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Excels at expressive anime characters and fantasy scenes.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v2.4.5"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-2.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Epic Realism
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Delivers photorealistic portraits and detailed environments.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v7.2.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-3.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Brush Master
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Mimics classic oil textures with a Renaissance feel.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v1.5.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-4.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Blue Pencil
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Blends soft realism with stylized character art.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v3.4.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-5.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Kandinsky
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Converts photos into cartoon-style portraits with lots of options.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v4.2.6"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-6.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Techwear
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Tailored for game assets and concept art with style presets.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v4.2.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-7.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Counterfeit
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Evolves images through genetic blending and user input.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v1.6.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-8.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Runway Gen
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Enables dynamic storytelling through video and image synthesis.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v3.0.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-9.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    BitBrush
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Crisp pixel sprites and backgrounds, ideal for indie game development.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v6.0.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-10.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Midjourney
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Offers high-res outputs and flexible fine-tuning for diverse styles.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v1.2.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-11.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Stable Diffusion
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Creates surreal, pattern-heavy visuals with a dreamlike feel.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v3.0.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-12.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    GPT-4o
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Known for photorealism, fast generation, diverse styles.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v6.2.1"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-13.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Artbreeder
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Combines fantasy realism with dramatic lighting and texture.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v2.0.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-14.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Spray Bot
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Captures aerosol gradients, drips, and bold street art compositions.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v3.4.0"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-15.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Neon Pulse
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Emulates tube lighting, reflections, and electric ambiance.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v1.6.2"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card className="relative">
              <CardActionArea href="/applications/ai-content/ai-model-detail" component={Link}>
                <CardMedia
                  component="img"
                  alt="product"
                  className="h-48 rounded-md"
                  image="/images/models/model-16.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    Cut Craft
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary line-clamp-2">
                    Great for storytelling, seasonal decor, and cultural motifs.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Chip
                label="v1.0.4"
                size="small"
                variant="filled"
                className="bg-background-paper pointer-events-none absolute inset-e-6 top-6"
              />
            </Card>
          </Grid>
        </Grid>

        <Grid size={12} className="flex justify-center">
          <Pagination
            size="medium"
            className="surface-standard"
            count={3}
            renderItem={(item) => (
              <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
