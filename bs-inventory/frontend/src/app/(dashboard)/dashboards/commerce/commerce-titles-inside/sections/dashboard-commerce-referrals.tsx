import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

export default function DashboardCommerceInventory() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Referrals
        </Typography>

        <List className="w-full">
          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#FF57BC]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="url(#paint0_radial_5640_15063)"
                      />
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="url(#paint1_radial_5640_15063)"
                      />
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="url(#paint2_radial_5640_15063)"
                      />
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="url(#paint3_radial_5640_15063)"
                      />
                      <path
                        d="M10.0063 3.66632C8.28461 3.66632 8.06855 3.67384 7.39233 3.70459C6.71745 3.73547 6.25678 3.84224 5.85369 3.9989C5.43675 4.1607 5.08305 4.37713 4.73069 4.72937C4.37806 5.08148 4.16146 5.4349 3.99901 5.85141C3.84184 6.25433 3.73486 6.71479 3.70449 7.38891C3.67425 8.06461 3.66632 8.28066 3.66632 10.0011C3.66632 11.7215 3.67398 11.9367 3.70462 12.6124C3.73566 13.2868 3.84251 13.7471 3.99914 14.1499C4.16119 14.5666 4.37779 14.92 4.73029 15.2721C5.08253 15.6245 5.43622 15.8414 5.8529 16.0032C6.25625 16.1599 6.71705 16.2667 7.3918 16.2975C8.06802 16.3283 8.28395 16.3358 10.0055 16.3358C11.7273 16.3358 11.9427 16.3283 12.6189 16.2975C13.2938 16.2667 13.755 16.1599 14.1584 16.0032C14.5752 15.8414 14.9284 15.6245 15.2806 15.2721C15.6332 14.92 15.8498 14.5666 16.0123 14.1501C16.1681 13.7471 16.2751 13.2867 16.3068 12.6126C16.3372 11.9369 16.3451 11.7215 16.3451 10.0011C16.3451 8.28065 16.3372 8.06475 16.3068 7.38904C16.2751 6.71465 16.1681 6.25433 16.0123 5.85155C15.8498 5.4349 15.6332 5.08148 15.2806 4.72937C14.928 4.377 14.5753 4.16056 14.158 3.9989C13.7538 3.84224 13.2929 3.73547 12.618 3.70459C11.9418 3.67384 11.7265 3.66632 10.0043 3.66632H10.0063ZM9.4376 4.8079C9.60639 4.80763 9.79472 4.8079 10.0063 4.8079C11.6989 4.8079 11.8996 4.81397 12.568 4.84432C13.1861 4.87257 13.5215 4.97576 13.745 5.06247C14.0408 5.17729 14.2518 5.31454 14.4735 5.53626C14.6954 5.75798 14.8327 5.96914 14.9479 6.26475C15.0347 6.48779 15.1381 6.823 15.1662 7.44065C15.1966 8.10843 15.2032 8.30903 15.2032 9.99962C15.2032 11.6902 15.1966 11.8908 15.1662 12.5586C15.138 13.1762 15.0347 13.5114 14.9479 13.7345C14.833 14.0301 14.6954 14.2406 14.4735 14.4622C14.2516 14.6839 14.041 14.8211 13.745 14.936C13.5218 15.0231 13.1861 15.126 12.568 15.1543C11.8997 15.1846 11.6989 15.1912 10.0063 15.1912C8.31354 15.1912 8.11292 15.1846 7.44463 15.1543C6.82654 15.1257 6.49108 15.0225 6.26748 14.9358C5.97164 14.821 5.76032 14.6838 5.53844 14.462C5.31656 14.2403 5.17921 14.0297 5.06404 13.7339C4.97727 13.5109 4.87386 13.1757 4.84573 12.5581C4.81535 11.8903 4.80927 11.6897 4.80927 9.99803C4.80927 8.3064 4.81535 8.10684 4.84573 7.43906C4.87399 6.82142 4.97727 6.48621 5.06404 6.26291C5.17894 5.96729 5.31656 5.75613 5.53844 5.53442C5.76032 5.31269 5.97164 5.17545 6.26748 5.06036C6.49095 4.97326 6.82654 4.87032 7.44463 4.84194C8.02945 4.81555 8.25609 4.80763 9.4376 4.80631L9.4376 4.8079ZM13.3903 5.85973C12.9703 5.85973 12.6295 6.19983 12.6295 6.61963C12.6295 7.03931 12.9703 7.37981 13.3903 7.37981C13.8102 7.37981 14.151 7.03931 14.151 6.61963C14.151 6.19996 13.8102 5.85973 13.3903 5.85973ZM10.0063 6.74791C8.2084 6.74791 6.75073 8.20451 6.75073 10.0011C6.75073 11.7976 8.2084 13.2536 10.0063 13.2536C11.8042 13.2536 13.2613 11.7976 13.2613 10.0011C13.2613 8.20451 11.8042 6.74791 10.0063 6.74791ZM10.0063 7.88949C11.1733 7.88949 12.1195 8.83482 12.1195 10.0011C12.1195 11.1672 11.1733 12.1126 10.0063 12.1126C8.83919 12.1126 7.89315 11.1672 7.89315 10.0011C7.89315 8.83482 8.83919 7.88949 10.0063 7.88949Z"
                        fill="white"
                      />
                      <defs>
                        <radialGradient
                          id="paint0_radial_5640_15063"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(19.3542 9.37425) rotate(164.25) scale(12.7789 9.20656)"
                        >
                          <stop stopColor="#FF005F" />
                          <stop offset="1" stopColor="#FC01D8" />
                        </radialGradient>
                        <radialGradient
                          id="paint1_radial_5640_15063"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(5.31235 21.5404) rotate(-90) scale(15.9644 16.9379)"
                        >
                          <stop stopColor="#FFCC00" />
                          <stop offset="0.1242" stopColor="#FFCC00" />
                          <stop offset="0.5672" stopColor="#FE4A05" />
                          <stop offset="0.6942" stopColor="#FF0F3F" />
                          <stop offset="1" stopColor="#FE0657" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient
                          id="paint2_radial_5640_15063"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(10.5054 19.7179) rotate(-59.8703) scale(6.60141 8.59429)"
                        >
                          <stop stopColor="#FFCC00" />
                          <stop offset="1" stopColor="#FFCC00" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient
                          id="paint3_radial_5640_15063"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(2.71357 0.814394) rotate(164.274) scale(12.6371 4.30546)"
                        >
                          <stop stopColor="#780CFF" />
                          <stop offset="1" stopColor="#820BFF" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      Instagram
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                3.1%
              </Button>
              <Typography component="p">4,482</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#0866FF]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.0011 10C20.0011 4.47716 15.5239 -1.90735e-06 10.0011 -1.90735e-06C4.47826 -1.90735e-06 0.00109863 4.47716 0.00109863 10C0.00109863 14.6898 3.2297 18.6249 7.58534 19.7055V13.0558H5.52326V10H7.58534V8.68324C7.58534 5.27956 9.12566 3.70196 12.4673 3.70196C13.1008 3.70196 14.1939 3.82616 14.6411 3.9504V6.72056C14.4051 6.69572 13.9952 6.68328 13.4859 6.68328C11.8461 6.68328 11.2126 7.3044 11.2126 8.91928V10H14.4789L13.9178 13.0558H11.2126V19.9268C16.164 19.3287 20.0011 15.1127 20.0011 10Z"
                        fill="#0866FF"
                      />
                      <path
                        d="M13.9174 13.0558L14.4785 10H11.2122V8.91924C11.2122 7.30436 11.8457 6.68328 13.4854 6.68328C13.9947 6.68328 14.4047 6.69568 14.6407 6.72052V3.9504C14.1935 3.82616 13.1003 3.70192 12.4668 3.70192C9.12527 3.70192 7.58491 5.27956 7.58491 8.68324V10H5.52283V13.0558H7.58491V19.7055C8.35863 19.8974 9.16763 20 10.0007 20C10.4108 20 10.815 19.9747 11.2122 19.9268V13.0558H13.9174Z"
                        fill="white"
                      />
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      Facebook
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                2.7%
              </Button>
              <Typography component="p">3,672</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#FF4500]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#FF4500"
                      />
                      <path
                        d="M16.6698 9.99978C16.6399 9.19442 15.9638 8.56553 15.156 8.59288C14.798 8.6053 14.4575 8.75196 14.199 8.99804C13.0605 8.2225 11.7232 7.79745 10.3486 7.76762L10.9974 4.64806L13.1376 5.09797C13.1972 5.64731 13.6894 6.04503 14.2387 5.98537C14.7881 5.92571 15.1858 5.43354 15.1261 4.8842C15.0665 4.33486 14.5743 3.93715 14.025 3.9968C13.7093 4.02912 13.4259 4.21306 13.2693 4.48649L10.8184 3.9968C10.6519 3.95952 10.4853 4.06392 10.448 4.23294C10.448 4.23543 10.448 4.23543 10.448 4.23792L9.70979 7.70796C8.31779 7.73033 6.96308 8.15788 5.80971 8.93839C5.22308 8.38656 4.2984 8.4139 3.74657 9.00302C3.19475 9.58964 3.22209 10.5143 3.8112 11.0662C3.92555 11.173 4.05729 11.265 4.20394 11.3296C4.194 11.4763 4.194 11.623 4.20394 11.7696C4.20394 14.0092 6.81394 15.8313 10.0329 15.8313C13.2519 15.8313 15.8619 14.0117 15.8619 11.7696C15.8719 11.623 15.8719 11.4763 15.8619 11.3296C16.364 11.0786 16.6797 10.5616 16.6698 9.99978ZM6.66977 11.0015C6.66977 10.4497 7.11968 9.99978 7.67151 9.99978C8.22333 9.99978 8.67325 10.4497 8.67325 11.0015C8.67325 11.5534 8.22333 12.0033 7.67151 12.0033C7.11719 11.9983 6.66977 11.5534 6.66977 11.0015ZM12.4789 13.7507C11.768 14.2851 10.898 14.5586 10.0081 14.5213C9.11819 14.5586 8.24819 14.2851 7.53728 13.7507C7.44282 13.6364 7.46022 13.4649 7.57456 13.3704C7.67399 13.2884 7.81568 13.2884 7.91759 13.3704C8.51913 13.8104 9.25242 14.0341 9.99813 13.9993C10.7438 14.0391 11.4796 13.8253 12.0886 13.3903C12.198 13.2834 12.377 13.2859 12.4838 13.3953C12.5907 13.5046 12.5882 13.6836 12.4789 13.7905V13.7507ZM12.2999 12.0381C11.7481 12.0381 11.2982 11.5882 11.2982 11.0363C11.2982 10.4845 11.7481 10.0346 12.2999 10.0346C12.8517 10.0346 13.3016 10.4845 13.3016 11.0363C13.324 11.5882 12.894 12.053 12.3422 12.0754C12.3247 12.0754 12.3098 12.0754 12.2924 12.0754L12.2999 12.0381Z"
                        fill="white"
                      />
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      Reddit
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                5.7%
              </Button>
              <Typography component="p">1,884</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#1ED760]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 0C4.47984 0 0 4.47984 0 10C0 15.5202 4.47984 20 10 20C15.5202 20 20 15.5202 20 10C20 4.47984 15.5202 0 10 0Z"
                        fill="#1ED760"
                      />
                      <path
                        d="M16.3958 8.996C16.1861 8.996 16.0571 8.94358 15.8756 8.83874C13.0047 7.12503 7.87161 6.71374 4.54903 7.64116C4.40387 7.68148 4.22242 7.746 4.02887 7.746C3.49661 7.746 3.08936 7.33068 3.08936 6.79439C3.08936 6.246 3.42807 5.93552 3.79097 5.83068C5.21032 5.41535 6.79903 5.21777 8.52887 5.21777C11.4724 5.21777 14.5571 5.83068 16.8111 7.14519C17.1256 7.32664 17.3313 7.57664 17.3313 8.05648C17.3313 8.60487 16.8877 8.996 16.3958 8.996ZM15.1458 12.0686C14.9361 12.0686 14.795 11.9758 14.6498 11.8992C12.1297 10.4073 8.37161 9.80648 5.02887 10.7137C4.83532 10.7662 4.73048 10.8186 4.54903 10.8186C4.11758 10.8186 3.76677 10.4678 3.76677 10.0363C3.76677 9.60487 3.97645 9.31858 4.39177 9.20164C5.51274 8.88713 6.6579 8.65326 8.33532 8.65326C10.9523 8.65326 13.4805 9.30245 15.4724 10.4879C15.799 10.6815 15.9281 10.9315 15.9281 11.2823C15.924 11.7178 15.5853 12.0686 15.1458 12.0686ZM14.0611 14.7137C13.8918 14.7137 13.7869 14.6613 13.6297 14.5686C11.1135 13.0525 8.18613 12.9879 5.295 13.5807C5.13774 13.621 4.9321 13.6855 4.81516 13.6855C4.42403 13.6855 4.17807 13.375 4.17807 13.0484C4.17807 12.6331 4.42403 12.4355 4.72645 12.371C8.02887 11.6412 11.4039 11.7057 14.2829 13.4275C14.5289 13.5847 14.674 13.7258 14.674 14.0928C14.674 14.4597 14.3877 14.7137 14.0611 14.7137Z"
                        fill="black"
                      />
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      Spotify
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                1.1%
              </Button>
              <Typography component="p">1,240</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#FF0000]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M15.7449 6.96596C15.6045 6.44115 15.192 6.02873 14.6672 5.88825C13.717 5.63337 9.9048 5.63337 9.9048 5.63337C9.9048 5.63337 6.09267 5.63337 5.14239 5.88825C4.61759 6.02873 4.20516 6.44115 4.06468 6.96596C3.8098 7.91624 3.8098 9.90008 3.8098 9.90008C3.8098 9.90008 3.8098 11.8839 4.06468 12.8342C4.20516 13.359 4.61759 13.7714 5.14239 13.9119C6.09267 14.1668 9.9048 14.1668 9.9048 14.1668C9.9048 14.1668 13.717 14.1668 14.6672 13.9119C15.192 13.7714 15.6045 13.359 15.7449 12.8342C15.9998 11.8839 15.9998 9.90008 15.9998 9.90008C15.9998 9.90008 15.9988 7.91624 15.7449 6.96596Z"
                        fill="white"
                      />
                      <path d="M8.68522 11.7278L11.8521 9.89954L8.68522 8.07122V11.7278Z" fill="#FF0000" />
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      Youtube
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="success"
                variant="pastel"
                startIcon={<NiTriangleUp size={"tiny"} />}
              >
                3.4%
              </Button>
              <Typography component="p">947</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem className="px-0 py-0">
            <ListItemButton classes={{ root: "group items-center justify-between ps-2" }}>
              <Box className="flex flex-row items-center">
                <ListItemAvatar>
                  <Avatar className="medium me-3 bg-[#47D052]/10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                        fill="#47D052"
                      />
                      <path
                        d="M4.29197 9.80325C4.29162 10.8346 4.5611 11.8415 5.07336 12.7289L4.2428 15.7613L7.34618 14.9476C8.20126 15.4139 9.16389 15.6596 10.1436 15.66H10.1461C13.3723 15.66 15.9989 13.0343 16.0002 9.80779C16.0007 8.24395 15.3923 6.77359 14.2871 5.66747C13.1818 4.56135 11.7121 3.95185 10.1461 3.95117C6.91922 3.95117 4.29322 6.57633 4.29187 9.80306M6.13996 12.576L6.02412 12.392C5.53699 11.6176 5.27989 10.7225 5.28024 9.8035C5.2813 7.12165 7.46396 4.93961 10.1478 4.93961C11.4475 4.94012 12.6691 5.44681 13.5879 6.36611C14.5066 7.28548 15.0121 8.50765 15.0118 9.80732C15.0106 12.4893 12.8279 14.6715 10.146 14.6715H10.1441C9.27086 14.671 8.41447 14.4366 7.66761 13.9934L7.48985 13.8881L5.64817 14.3709L6.13996 12.576ZM10.1461 15.66C10.146 15.66 10.1461 15.66 10.1461 15.66V15.66Z"
                        fill="url(#paint0_linear_5349_16865)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.683 7.35674C8.57341 7.11314 8.4581 7.10827 8.35387 7.10398C8.26856 7.10035 8.171 7.10059 8.07355 7.10059C7.97598 7.10059 7.81751 7.1372 7.68351 7.28358C7.54939 7.42996 7.17151 7.7838 7.17151 8.50345C7.17151 9.22316 7.69573 9.91857 7.76876 10.0163C7.84192 10.1138 8.78071 11.6378 10.2674 12.2241C11.503 12.7114 11.7545 12.6144 12.0226 12.59C12.2908 12.5657 12.8881 12.2363 13.0099 11.8947C13.1318 11.5532 13.1318 11.2605 13.0953 11.1993C13.0587 11.1384 12.9612 11.1018 12.8149 11.0287C12.6686 10.9555 11.9495 10.6016 11.8154 10.5528C11.6813 10.504 11.5838 10.4797 11.4862 10.6261C11.3887 10.7724 11.1086 11.1018 11.0232 11.1993C10.9379 11.2971 10.8525 11.3093 10.7063 11.2361C10.5599 11.1627 10.0888 11.0084 9.52996 10.5102C9.09511 10.1225 8.80156 9.64366 8.71619 9.4972C8.63089 9.35094 8.70709 9.27171 8.78043 9.19878C8.84615 9.13324 8.92675 9.02799 8.99991 8.94262C9.07289 8.8572 9.09724 8.79624 9.146 8.69867C9.19481 8.60104 9.1704 8.51562 9.13385 8.44245C9.09724 8.36929 8.81307 7.64599 8.683 7.35674Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_5349_16865"
                          x1="10.1216"
                          y1="15.7616"
                          x2="10.1216"
                          y2="3.95153"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#F9F9F9" />
                          <stop offset="1" stopColor="white" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="w-20 flex-none"
                  primary={
                    <Typography
                      component="p"
                      variant="subtitle2"
                      className="group-hover:text-primary leading-4 transition-colors"
                    >
                      WhatsApp
                    </Typography>
                  }
                />
              </Box>
              <Button
                className="pointer-events-none self-center"
                size="tiny"
                color="error"
                variant="pastel"
                startIcon={<NiTriangleDown size={"tiny"} />}
              >
                2.8%
              </Button>
              <Typography component="p">288</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
