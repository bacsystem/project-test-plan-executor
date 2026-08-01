"use client";

import Link from "next/link";
import React from "react";

import { Breadcrumbs, Grid, Typography } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid size={12} container>
        <Grid size={{ xs: 12, md: "grow" }} spacing={2.5}>
          <Typography variant="h1" component="h1" className="mb-0">
            Email Templates
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/miscellaneous">
              Miscellaneous
            </Link>
            <Typography variant="body2">Email Templates</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12}>
        <div
          dangerouslySetInnerHTML={{
            __html: `<table
          style="
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border: none;
            border-collapse: separate !important;
            border-radius: 28px;
            border-spacing: 0;
            color: #4d4d4d;
            margin: 0;
            padding: 40px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            box-shadow: 0 3px 8px rgb(0 0 0 / 3%) !important;
            font-family: Mulish, Helvetica, Arial, sans-serif;
          "
        >
          <tbody>
            <tr>
              <td style="text-align: center">
                <img src="/images/email/logo.svg" alt="logo" style="width: 108px; margin-bottom: 56px; clear: both; display: inline-block" />
              </td>
            </tr>
            <tr>
              <td style="text-align: center">
                <h1 style="font-size: 26px; font-family: Urbanist, Helvetica, Arial, sans-serif; margin-top: 0; margin-bottom: 40px; font-weight: bold">
                  You are almost there!
                </h1>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin-bottom:12px;">Hi Laura, welcome!</p>
                <p style="margin-bottom:12px;">
                  Discover the perfect blend of tradition and creativity with our handcrafted wooden toy. Made from eco-friendly and sustainable wood, this toy
                  is designed to inspire imaginative play while promoting environmental consciousness. Its charming and natural design evokes a sense of
                  nostalgia, making it a cherished addition to any toy collection.
                </p>
                <br/>
                <p style="font-weight: bold; margin-bottom:12px;">Steps to follow:</p>
                <ul style="margin-bottom:24px;">
                  <li>1. Discover the perfect wooden toy</li>
                  <li>2. Blend of tradition and creativity</li>
                  <li>3. Made from eco-friendly and sustainable wood</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="submit"
                  style="
                    cursor: pointer;
                    padding: 8px 16px;
                    color: #F9802B;
                    background-color: white;
                    border: 1px solid #F9802B;
                    border-radius: 16px;
                    font-family: Mulish, Helvetica, Arial, sans-serif;
                  "
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3478 5.30358C17.9812 9.82459 16.047 14.1364 12.9448 17.4454C11.3688 19.1264 8.50967 18.2492 8.22386 15.9627L7.92507 13.5724C7.8305 12.8158 7.23457 12.2199 6.478 12.1253L4.08765 11.8265C1.80123 11.5407 0.923953 8.68157 2.60496 7.10562C5.91403 4.00337 10.2258 2.06917 14.7468 1.7026C16.8006 1.53608 18.5143 3.24979 18.3478 5.30358Z"
                      stroke="#F9802B"
                      stroke-width="1.25"
                    />
                    <path opacity="0.6" d="M7.76562 12.2871L10.4173 9.63546" stroke="#F9802B" stroke-width="1.25" stroke-linecap="round" />
                  </svg>
                  <span style="display: inline-block; vertical-align: middle; line-height: 20px">Validate Now</span>
                </button>
              </td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr>
              <td style="border-top: 1px solid #f2f2f2; text-align: center">
                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 87, 188, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint0_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint1_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint2_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint3_radial_5900_18745)"
                    />
                    <path
                      d="M10.0063 3.763C8.28461 3.763 8.06855 3.77052 7.39233 3.80127C6.71745 3.83215 6.25678 3.93892 5.85369 4.09558C5.43675 4.25738 5.08305 4.47381 4.73069 4.82605C4.37806 5.17816 4.16146 5.53158 3.99901 5.94809C3.84184 6.35101 3.73486 6.81147 3.70449 7.48559C3.67425 8.16129 3.66632 8.37734 3.66632 10.0977C3.66632 11.8182 3.67398 12.0334 3.70462 12.7091C3.73566 13.3835 3.84251 13.8438 3.99914 14.2466C4.16119 14.6633 4.37779 15.0167 4.73029 15.3688C5.08253 15.7212 5.43622 15.9381 5.8529 16.0999C6.25625 16.2566 6.71705 16.3633 7.3918 16.3942C8.06802 16.425 8.28395 16.4325 10.0055 16.4325C11.7273 16.4325 11.9427 16.425 12.6189 16.3942C13.2938 16.3633 13.755 16.2566 14.1584 16.0999C14.5752 15.9381 14.9284 15.7212 15.2806 15.3688C15.6332 15.0167 15.8498 14.6633 16.0123 14.2467C16.1681 13.8438 16.2751 13.3834 16.3068 12.7092C16.3372 12.0335 16.3451 11.8182 16.3451 10.0977C16.3451 8.37733 16.3372 8.16143 16.3068 7.48572C16.2751 6.81133 16.1681 6.35101 16.0123 5.94823C15.8498 5.53158 15.6332 5.17816 15.2806 4.82605C14.928 4.47368 14.5753 4.25724 14.158 4.09558C13.7538 3.93892 13.2929 3.83215 12.618 3.80127C11.9418 3.77052 11.7265 3.763 10.0043 3.763H10.0063ZM9.4376 4.90458C9.60639 4.90431 9.79472 4.90458 10.0063 4.90458C11.6989 4.90458 11.8996 4.91065 12.568 4.941C13.1861 4.96925 13.5215 5.07244 13.745 5.15915C14.0408 5.27397 14.2518 5.41122 14.4735 5.63294C14.6954 5.85466 14.8327 6.06582 14.9479 6.36143C15.0347 6.58447 15.1381 6.91968 15.1662 7.53732C15.1966 8.20511 15.2032 8.40571 15.2032 10.0963C15.2032 11.7869 15.1966 11.9875 15.1662 12.6553C15.138 13.2729 15.0347 13.6081 14.9479 13.8312C14.833 14.1268 14.6954 14.3373 14.4735 14.5589C14.2516 14.7806 14.041 14.9178 13.745 15.0326C13.5218 15.1198 13.1861 15.2227 12.568 15.2509C11.8997 15.2813 11.6989 15.2879 10.0063 15.2879C8.31354 15.2879 8.11292 15.2813 7.44463 15.2509C6.82654 15.2224 6.49108 15.1192 6.26748 15.0325C5.97164 14.9177 5.76032 14.7804 5.53844 14.5587C5.31656 14.337 5.17921 14.1264 5.06404 13.8306C4.97727 13.6076 4.87386 13.2724 4.84573 12.6547C4.81535 11.987 4.80927 11.7864 4.80927 10.0947C4.80927 8.40308 4.81535 8.20352 4.84573 7.53574C4.87399 6.9181 4.97727 6.58289 5.06404 6.35959C5.17894 6.06397 5.31656 5.85281 5.53844 5.63109C5.76032 5.40937 5.97164 5.27213 6.26748 5.15704C6.49095 5.06994 6.82654 4.967 7.44463 4.93862C8.02945 4.91223 8.25609 4.90431 9.4376 4.90299L9.4376 4.90458ZM13.3903 5.95641C12.9703 5.95641 12.6295 6.29651 12.6295 6.71631C12.6295 7.13599 12.9703 7.47649 13.3903 7.47649C13.8102 7.47649 14.151 7.13599 14.151 6.71631C14.151 6.29664 13.8102 5.95641 13.3903 5.95641ZM10.0063 6.84459C8.2084 6.84459 6.75073 8.30119 6.75073 10.0977C6.75073 11.8943 8.2084 13.3502 10.0063 13.3502C11.8042 13.3502 13.2613 11.8943 13.2613 10.0977C13.2613 8.30119 11.8042 6.84459 10.0063 6.84459ZM10.0063 7.98617C11.1733 7.98617 12.1195 8.9315 12.1195 10.0977C12.1195 11.2639 11.1733 12.2093 10.0063 12.2093C8.83919 12.2093 7.89315 11.2639 7.89315 10.0977C7.89315 8.9315 8.83919 7.98617 10.0063 7.98617Z"
                      fill="white"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(19.3542 9.47093) rotate(164.25) scale(12.7789 9.20656)"
                      >
                        <stop stop-color="#FF005F" />
                        <stop offset="1" stop-color="#FC01D8" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(5.31235 21.6371) rotate(-90) scale(15.9644 16.9379)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="0.1242" stop-color="#FFCC00" />
                        <stop offset="0.5672" stop-color="#FE4A05" />
                        <stop offset="0.6942" stop-color="#FF0F3F" />
                        <stop offset="1" stop-color="#FE0657" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint2_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(10.5054 19.8146) rotate(-59.8703) scale(6.60141 8.59429)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="1" stop-color="#FFCC00" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint3_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(2.71357 0.911074) rotate(164.274) scale(12.6371 4.30546)"
                      >
                        <stop stop-color="#780CFF" />
                        <stop offset="1" stop-color="#820BFF" stop-opacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(15, 20, 25, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#0F1419"
                    />
                    <path
                      d="M13.6908 4.0957H15.3769L11.6748 8.7636L16 15.0957H12.6058L9.94835 11.2477L6.90603 15.0957H5.21993L9.14195 10.1031L5 4.0957H8.47851L10.8794 7.61083L13.6908 4.0957ZM13.1006 13.9998H14.0353L7.98734 5.15105H6.98301L13.1006 13.9998Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 0, 0, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M15.7449 7.06264C15.6045 6.53783 15.192 6.12541 14.6672 5.98493C13.717 5.73005 9.9048 5.73005 9.9048 5.73005C9.9048 5.73005 6.09267 5.73005 5.14239 5.98493C4.61759 6.12541 4.20516 6.53783 4.06468 7.06264C3.8098 8.01292 3.8098 9.99676 3.8098 9.99676C3.8098 9.99676 3.8098 11.9806 4.06468 12.9309C4.20516 13.4557 4.61759 13.8681 5.14239 14.0086C6.09267 14.2635 9.9048 14.2635 9.9048 14.2635C9.9048 14.2635 13.717 14.2635 14.6672 14.0086C15.192 13.8681 15.6045 13.4557 15.7449 12.9309C15.9998 11.9806 15.9998 9.99676 15.9998 9.99676C15.9998 9.99676 15.9988 8.01292 15.7449 7.06264Z"
                      fill="white"
                    />
                    <path d="M8.68522 11.8245L11.8521 9.99622L8.68522 8.1679V11.8245Z" fill="#FF0000" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="margin-top: 10px; padding-bottom: 20px; margin-bottom: 40px; max-width: 600px; width: 100%; font-family: Mulish, Helvetica, Arial, sans-serif"
        >
          <tbody>
            <tr>
              <td style="text-align: center; vertical-align: center">
                <p style="font-size: 12px; text-decoration: none; line-height: 1; color: #afafaf; margin-top: 0px">
                  If you don't want to receive emails, please
                  <a href="#" style="color: #F9802B; text-decoration: none">unscubscribe</a>
                  .
                </p>
              </td>
            </tr>
          </tbody>
        </table>`,
          }}
        ></div>
      </Grid>

      <Grid size={12}>
        <div
          dangerouslySetInnerHTML={{
            __html: `<table
          style="
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            border: none;
            border-collapse: separate !important;
            border-radius: 28px;
            border-spacing: 0;
            color: #4d4d4d;
            margin: 0;
            padding: 40px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1;
            box-shadow: 0 3px 8px rgb(0 0 0 / 3%) !important;
            font-family: Mulish, Helvetica, Arial, sans-serif;
          "
        >
          <tbody>
            <tr>
              <td style="text-align: center">
                <img src="/images/email/logo.svg" alt="logo" style="width: 108px; margin-bottom: 56px; clear: both; display: inline-block" />
              </td>
            </tr>
            <tr>
              <td style="text-align: center">
                <h1 style="font-size: 26px; font-family: Urbanist, Helvetica, Arial, sans-serif; margin-top: 0; margin-bottom: 40px; font-weight: bold">
                  We received your order!
                </h1>
              </td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%; border-collapse: separate !important; color: #4d4d4d">
                  <thead>
                    <tr>
                      <th style="font-size: 12px; border-bottom: 1px solid #f2f2f2; text-align: left; padding-bottom: 16px; width: 56px">Image</th>
                      <th style="font-size: 12px; border-bottom: 1px solid #f2f2f2; text-align: left; padding-bottom: 16px; width: 130px">Name</th>
                      <th style="font-size: 12px; border-bottom: 1px solid #f2f2f2; text-align: left; padding-bottom: 16px">Price</th>
                      <th style="font-size: 12px; border-bottom: 1px solid #f2f2f2; text-align: left; padding-bottom: 16px; text-align: right">Qty</th>
                      <th style="font-size: 12px; border-bottom: 1px solid #f2f2f2; text-align: right; padding-bottom: 16px">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding-top: 16px; padding-bottom: 4px">
                        <img src="/images/email/product-1.png" alt="order-1" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 16px; padding-bottom: 4px">Stretchy</td>
                      <td style="padding-top: 16px; padding-bottom: 4px">$37.5</td>
                      <td style="padding-top: 16px; padding-bottom: 4px; text-align: right">2</td>
                      <td style="padding-top: 16px; padding-bottom: 4px; text-align: right">$75.00</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px">
                        <img src="/images/email/product-2.png" alt="order-2" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 4px; padding-bottom: 4px">Pony Soprano</td>
                      <td style="padding-top: 4px; padding-bottom: 4px">$24.4</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">4</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">$97.60</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px">
                        <img src="/images/email/product-3.png" alt="order-3" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 4px; padding-bottom: 4px">Buck Rogers</td>
                      <td style="padding-top: 4px; padding-bottom: 4px">$28.75</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">2</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">$57.50</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px">
                        <img src="/images/email/product-4.png" alt="order-4" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 4px; padding-bottom: 4px">Paperwork</td>
                      <td style="padding-top: 4px; padding-bottom: 4px">$18.25</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">3</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">$54.75</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px">
                        <img src="/images/email/product-5.png" alt="order-5" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 4px; padding-bottom: 4px">Cinnabun</td>
                      <td style="padding-top: 4px; padding-bottom: 4px">$18.25</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">3</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">$54.75</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; padding-bottom: 4px">
                        <img src="/images/email/product-6.png" alt="order-6" style="border-radius: 14px" />
                      </td>
                      <td style="padding-top: 4px; padding-bottom: 4px">Donatello</td>
                      <td style="padding-top: 4px; padding-bottom: 4px">$18.75</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">2</td>
                      <td style="padding-top: 4px; padding-bottom: 4px; text-align: right">$57.50</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style="padding-top: 40px; padding-bottom: 8px; text-align: right; font-weight: bold" colspan="4">Subtotal</td>
                      <td style="padding-top: 40px; padding-bottom: 8px; text-align: right">$342.35</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right; font-weight: bold" colspan="4">Tax</td>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right">$25.50</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right; font-weight: bold" colspan="4">Discount</td>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right">-$65.20</td>
                    </tr>
                    <tr>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right; font-weight: bold" colspan="4">Grand Total</td>
                      <td style="padding-top: 8px; padding-bottom: 8px; text-align: right; font-weight: bold">$302.65</td>
                    </tr>
                  </tfoot>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr>
              <td style="border-top: 1px solid #f2f2f2; text-align: center">
                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 87, 188, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint0_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint1_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint2_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint3_radial_5900_18745)"
                    />
                    <path
                      d="M10.0063 3.763C8.28461 3.763 8.06855 3.77052 7.39233 3.80127C6.71745 3.83215 6.25678 3.93892 5.85369 4.09558C5.43675 4.25738 5.08305 4.47381 4.73069 4.82605C4.37806 5.17816 4.16146 5.53158 3.99901 5.94809C3.84184 6.35101 3.73486 6.81147 3.70449 7.48559C3.67425 8.16129 3.66632 8.37734 3.66632 10.0977C3.66632 11.8182 3.67398 12.0334 3.70462 12.7091C3.73566 13.3835 3.84251 13.8438 3.99914 14.2466C4.16119 14.6633 4.37779 15.0167 4.73029 15.3688C5.08253 15.7212 5.43622 15.9381 5.8529 16.0999C6.25625 16.2566 6.71705 16.3633 7.3918 16.3942C8.06802 16.425 8.28395 16.4325 10.0055 16.4325C11.7273 16.4325 11.9427 16.425 12.6189 16.3942C13.2938 16.3633 13.755 16.2566 14.1584 16.0999C14.5752 15.9381 14.9284 15.7212 15.2806 15.3688C15.6332 15.0167 15.8498 14.6633 16.0123 14.2467C16.1681 13.8438 16.2751 13.3834 16.3068 12.7092C16.3372 12.0335 16.3451 11.8182 16.3451 10.0977C16.3451 8.37733 16.3372 8.16143 16.3068 7.48572C16.2751 6.81133 16.1681 6.35101 16.0123 5.94823C15.8498 5.53158 15.6332 5.17816 15.2806 4.82605C14.928 4.47368 14.5753 4.25724 14.158 4.09558C13.7538 3.93892 13.2929 3.83215 12.618 3.80127C11.9418 3.77052 11.7265 3.763 10.0043 3.763H10.0063ZM9.4376 4.90458C9.60639 4.90431 9.79472 4.90458 10.0063 4.90458C11.6989 4.90458 11.8996 4.91065 12.568 4.941C13.1861 4.96925 13.5215 5.07244 13.745 5.15915C14.0408 5.27397 14.2518 5.41122 14.4735 5.63294C14.6954 5.85466 14.8327 6.06582 14.9479 6.36143C15.0347 6.58447 15.1381 6.91968 15.1662 7.53732C15.1966 8.20511 15.2032 8.40571 15.2032 10.0963C15.2032 11.7869 15.1966 11.9875 15.1662 12.6553C15.138 13.2729 15.0347 13.6081 14.9479 13.8312C14.833 14.1268 14.6954 14.3373 14.4735 14.5589C14.2516 14.7806 14.041 14.9178 13.745 15.0326C13.5218 15.1198 13.1861 15.2227 12.568 15.2509C11.8997 15.2813 11.6989 15.2879 10.0063 15.2879C8.31354 15.2879 8.11292 15.2813 7.44463 15.2509C6.82654 15.2224 6.49108 15.1192 6.26748 15.0325C5.97164 14.9177 5.76032 14.7804 5.53844 14.5587C5.31656 14.337 5.17921 14.1264 5.06404 13.8306C4.97727 13.6076 4.87386 13.2724 4.84573 12.6547C4.81535 11.987 4.80927 11.7864 4.80927 10.0947C4.80927 8.40308 4.81535 8.20352 4.84573 7.53574C4.87399 6.9181 4.97727 6.58289 5.06404 6.35959C5.17894 6.06397 5.31656 5.85281 5.53844 5.63109C5.76032 5.40937 5.97164 5.27213 6.26748 5.15704C6.49095 5.06994 6.82654 4.967 7.44463 4.93862C8.02945 4.91223 8.25609 4.90431 9.4376 4.90299L9.4376 4.90458ZM13.3903 5.95641C12.9703 5.95641 12.6295 6.29651 12.6295 6.71631C12.6295 7.13599 12.9703 7.47649 13.3903 7.47649C13.8102 7.47649 14.151 7.13599 14.151 6.71631C14.151 6.29664 13.8102 5.95641 13.3903 5.95641ZM10.0063 6.84459C8.2084 6.84459 6.75073 8.30119 6.75073 10.0977C6.75073 11.8943 8.2084 13.3502 10.0063 13.3502C11.8042 13.3502 13.2613 11.8943 13.2613 10.0977C13.2613 8.30119 11.8042 6.84459 10.0063 6.84459ZM10.0063 7.98617C11.1733 7.98617 12.1195 8.9315 12.1195 10.0977C12.1195 11.2639 11.1733 12.2093 10.0063 12.2093C8.83919 12.2093 7.89315 11.2639 7.89315 10.0977C7.89315 8.9315 8.83919 7.98617 10.0063 7.98617Z"
                      fill="white"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(19.3542 9.47093) rotate(164.25) scale(12.7789 9.20656)"
                      >
                        <stop stop-color="#FF005F" />
                        <stop offset="1" stop-color="#FC01D8" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(5.31235 21.6371) rotate(-90) scale(15.9644 16.9379)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="0.1242" stop-color="#FFCC00" />
                        <stop offset="0.5672" stop-color="#FE4A05" />
                        <stop offset="0.6942" stop-color="#FF0F3F" />
                        <stop offset="1" stop-color="#FE0657" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint2_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(10.5054 19.8146) rotate(-59.8703) scale(6.60141 8.59429)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="1" stop-color="#FFCC00" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint3_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(2.71357 0.911074) rotate(164.274) scale(12.6371 4.30546)"
                      >
                        <stop stop-color="#780CFF" />
                        <stop offset="1" stop-color="#820BFF" stop-opacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(15, 20, 25, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#0F1419"
                    />
                    <path
                      d="M13.6908 4.0957H15.3769L11.6748 8.7636L16 15.0957H12.6058L9.94835 11.2477L6.90603 15.0957H5.21993L9.14195 10.1031L5 4.0957H8.47851L10.8794 7.61083L13.6908 4.0957ZM13.1006 13.9998H14.0353L7.98734 5.15105H6.98301L13.1006 13.9998Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 0, 0, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M15.7449 7.06264C15.6045 6.53783 15.192 6.12541 14.6672 5.98493C13.717 5.73005 9.9048 5.73005 9.9048 5.73005C9.9048 5.73005 6.09267 5.73005 5.14239 5.98493C4.61759 6.12541 4.20516 6.53783 4.06468 7.06264C3.8098 8.01292 3.8098 9.99676 3.8098 9.99676C3.8098 9.99676 3.8098 11.9806 4.06468 12.9309C4.20516 13.4557 4.61759 13.8681 5.14239 14.0086C6.09267 14.2635 9.9048 14.2635 9.9048 14.2635C9.9048 14.2635 13.717 14.2635 14.6672 14.0086C15.192 13.8681 15.6045 13.4557 15.7449 12.9309C15.9998 11.9806 15.9998 9.99676 15.9998 9.99676C15.9998 9.99676 15.9988 8.01292 15.7449 7.06264Z"
                      fill="white"
                    />
                    <path d="M8.68522 11.8245L11.8521 9.99622L8.68522 8.1679V11.8245Z" fill="#FF0000" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="margin-top: 10px; padding-bottom: 20px; margin-bottom: 40px; width: 100%; max-width: 600px; font-family: Mulish, Helvetica, Arial, sans-serif"
        >
          <tbody>
            <tr>
              <td style="text-align: center; vertical-align: center">
                <p style="font-size: 12px; text-decoration: none; line-height: 1; color: #afafaf; margin-top: 0px">
                  If you don't want to receive emails, please
                  <a href="#" style="color: #F9802B; text-decoration: none">unscubscribe</a>
                  .
                </p>
              </td>
            </tr>
          </tbody>
        </table>`,
          }}
        ></div>
      </Grid>

      <Grid size={12}>
        <div
          dangerouslySetInnerHTML={{
            __html: `<table
          style="
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border: none;
            border-collapse: separate !important;
            border-radius: 28px;
            border-spacing: 0;
            color: #4d4d4d;
            margin: 0;
            padding: 40px;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            box-shadow: 0 3px 8px rgb(0 0 0 / 3%) !important;
            font-family: Mulish, Helvetica, Arial, sans-serif;
          "
        >
          <tbody>
            <tr>
              <td style="text-align: center">
                <img src="/images/email/logo.svg" alt="logo" style="width: 108px; margin-bottom: 56px; clear: both; display: inline-block" />
              </td>
            </tr>
            <tr>
              <td>
                <div style="margin-bottom: 8px">
                  <a href="#">
                    <img src="/images/email/product-large.png" alt="product large" style="width: 100%; border-radius: 16px" />
                  </a>
                </div>
                <div style="margin-bottom: 8px">
                  <a
                    href="#"
                    style="
                      font-size: 18px;
                      font-family: Urbanist, Helvetica, Arial, sans-serif;
                      margin-top: 0;
                      font-weight: bold;
                      color: #4d4d4d;
                      text-decoration: none;
                    "
                    >The Timeless Magic of Wooden Toys</a
                  >
                </div>
                <div style="margin-bottom: 16px">
                  <a href="#" style="font-size: 14px; font-family: Mulish, Helvetica, Arial, sans-serif; margin-top: 0; color: #4d4d4d; text-decoration: none"
                    >Discover the perfect blend of tradition and creativity with our handcrafted wooden toy. Made from eco-friendly and sustainable wood, this
                    toy is designed to inspire imaginative play while promoting environmental consciousness.
                  </a>
                </div>
                <div>
                  <button
                    type="submit"
                    style="
                      cursor: pointer;
                      padding: 8px 16px;
                      color: #F9802B;
                      background-color: white;
                      border: 1px solid #F9802B;
                      border-radius: 16px;
                      font-family: Mulish, Helvetica, Arial, sans-serif;
                    "
                  >
                    <span style="display: inline-block; vertical-align: middle; line-height: 20px">Read the Article</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%; table-layout: fixed">
                  <tr>
                    <td style="padding-right: 10px; padding-bottom: 10px; vertical-align: top">
                      <img src="/images/email/product-square-1.png" style="border-radius: 14px; width: 100%" />
                      <a
                        href="#"
                        style="
                          font-size: 16px;
                          font-family: Urbanist, Helvetica, Arial, sans-serif;
                          margin-top: 0;
                          font-weight: bold;
                          color: #4d4d4d;
                          text-decoration: none;
                        "
                        >What Makes Wooden Toys Special and Timeless?</a
                      >
                    </td>
                    <td style="padding-left: 10px; padding-bottom: 10px; vertical-align: top">
                      <img src="/images/email/product-square-2.png" style="border-radius: 14px; width: 100%" />
                      <a
                        href="#"
                        style="
                          font-size: 16px;
                          font-family: Urbanist, Helvetica, Arial, sans-serif;
                          margin-top: 0;
                          font-weight: bold;
                          color: #4d4d4d;
                          text-decoration: none;
                        "
                        >Wooden Toys vs. Plastic Toys: Which Is Better?</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px; padding-top: 10px; vertical-align: top">
                      <img src="/images/email/product-square-3.png" style="border-radius: 14px; width: 100%" />
                      <a
                        href="#"
                        style="
                          font-size: 16px;
                          font-family: Urbanist, Helvetica, Arial, sans-serif;
                          margin-top: 0;
                          font-weight: bold;
                          color: #4d4d4d;
                          text-decoration: none;
                        "
                        >Craftsmanship Meets Play: The Art of Wooden Toys</a
                      >
                    </td>
                    <td style="padding-left: 10px; padding-top: 10px; vertical-align: top">
                      <img src="/images/email/product-square-4.png" style="border-radius: 14px; width: 100%" />
                      <a
                        href="#"
                        style="
                          font-size: 16px;
                          font-family: Urbanist, Helvetica, Arial, sans-serif;
                          margin-top: 0;
                          font-weight: bold;
                          color: #4d4d4d;
                          text-decoration: none;
                        "
                        >How Wooden Toys Inspire a Greener Future</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height: 40px"></td>
            </tr>
            <tr>
              <td style="border-top: 1px solid #f2f2f2; text-align: center">
                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 87, 188, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint0_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint1_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint2_radial_5900_18745)"
                    />
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="url(#paint3_radial_5900_18745)"
                    />
                    <path
                      d="M10.0063 3.763C8.28461 3.763 8.06855 3.77052 7.39233 3.80127C6.71745 3.83215 6.25678 3.93892 5.85369 4.09558C5.43675 4.25738 5.08305 4.47381 4.73069 4.82605C4.37806 5.17816 4.16146 5.53158 3.99901 5.94809C3.84184 6.35101 3.73486 6.81147 3.70449 7.48559C3.67425 8.16129 3.66632 8.37734 3.66632 10.0977C3.66632 11.8182 3.67398 12.0334 3.70462 12.7091C3.73566 13.3835 3.84251 13.8438 3.99914 14.2466C4.16119 14.6633 4.37779 15.0167 4.73029 15.3688C5.08253 15.7212 5.43622 15.9381 5.8529 16.0999C6.25625 16.2566 6.71705 16.3633 7.3918 16.3942C8.06802 16.425 8.28395 16.4325 10.0055 16.4325C11.7273 16.4325 11.9427 16.425 12.6189 16.3942C13.2938 16.3633 13.755 16.2566 14.1584 16.0999C14.5752 15.9381 14.9284 15.7212 15.2806 15.3688C15.6332 15.0167 15.8498 14.6633 16.0123 14.2467C16.1681 13.8438 16.2751 13.3834 16.3068 12.7092C16.3372 12.0335 16.3451 11.8182 16.3451 10.0977C16.3451 8.37733 16.3372 8.16143 16.3068 7.48572C16.2751 6.81133 16.1681 6.35101 16.0123 5.94823C15.8498 5.53158 15.6332 5.17816 15.2806 4.82605C14.928 4.47368 14.5753 4.25724 14.158 4.09558C13.7538 3.93892 13.2929 3.83215 12.618 3.80127C11.9418 3.77052 11.7265 3.763 10.0043 3.763H10.0063ZM9.4376 4.90458C9.60639 4.90431 9.79472 4.90458 10.0063 4.90458C11.6989 4.90458 11.8996 4.91065 12.568 4.941C13.1861 4.96925 13.5215 5.07244 13.745 5.15915C14.0408 5.27397 14.2518 5.41122 14.4735 5.63294C14.6954 5.85466 14.8327 6.06582 14.9479 6.36143C15.0347 6.58447 15.1381 6.91968 15.1662 7.53732C15.1966 8.20511 15.2032 8.40571 15.2032 10.0963C15.2032 11.7869 15.1966 11.9875 15.1662 12.6553C15.138 13.2729 15.0347 13.6081 14.9479 13.8312C14.833 14.1268 14.6954 14.3373 14.4735 14.5589C14.2516 14.7806 14.041 14.9178 13.745 15.0326C13.5218 15.1198 13.1861 15.2227 12.568 15.2509C11.8997 15.2813 11.6989 15.2879 10.0063 15.2879C8.31354 15.2879 8.11292 15.2813 7.44463 15.2509C6.82654 15.2224 6.49108 15.1192 6.26748 15.0325C5.97164 14.9177 5.76032 14.7804 5.53844 14.5587C5.31656 14.337 5.17921 14.1264 5.06404 13.8306C4.97727 13.6076 4.87386 13.2724 4.84573 12.6547C4.81535 11.987 4.80927 11.7864 4.80927 10.0947C4.80927 8.40308 4.81535 8.20352 4.84573 7.53574C4.87399 6.9181 4.97727 6.58289 5.06404 6.35959C5.17894 6.06397 5.31656 5.85281 5.53844 5.63109C5.76032 5.40937 5.97164 5.27213 6.26748 5.15704C6.49095 5.06994 6.82654 4.967 7.44463 4.93862C8.02945 4.91223 8.25609 4.90431 9.4376 4.90299L9.4376 4.90458ZM13.3903 5.95641C12.9703 5.95641 12.6295 6.29651 12.6295 6.71631C12.6295 7.13599 12.9703 7.47649 13.3903 7.47649C13.8102 7.47649 14.151 7.13599 14.151 6.71631C14.151 6.29664 13.8102 5.95641 13.3903 5.95641ZM10.0063 6.84459C8.2084 6.84459 6.75073 8.30119 6.75073 10.0977C6.75073 11.8943 8.2084 13.3502 10.0063 13.3502C11.8042 13.3502 13.2613 11.8943 13.2613 10.0977C13.2613 8.30119 11.8042 6.84459 10.0063 6.84459ZM10.0063 7.98617C11.1733 7.98617 12.1195 8.9315 12.1195 10.0977C12.1195 11.2639 11.1733 12.2093 10.0063 12.2093C8.83919 12.2093 7.89315 11.2639 7.89315 10.0977C7.89315 8.9315 8.83919 7.98617 10.0063 7.98617Z"
                      fill="white"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(19.3542 9.47093) rotate(164.25) scale(12.7789 9.20656)"
                      >
                        <stop stop-color="#FF005F" />
                        <stop offset="1" stop-color="#FC01D8" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(5.31235 21.6371) rotate(-90) scale(15.9644 16.9379)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="0.1242" stop-color="#FFCC00" />
                        <stop offset="0.5672" stop-color="#FE4A05" />
                        <stop offset="0.6942" stop-color="#FF0F3F" />
                        <stop offset="1" stop-color="#FE0657" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint2_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(10.5054 19.8146) rotate(-59.8703) scale(6.60141 8.59429)"
                      >
                        <stop stop-color="#FFCC00" />
                        <stop offset="1" stop-color="#FFCC00" stop-opacity="0" />
                      </radialGradient>
                      <radialGradient
                        id="paint3_radial_5900_18745"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(2.71357 0.911074) rotate(164.274) scale(12.6371 4.30546)"
                      >
                        <stop stop-color="#780CFF" />
                        <stop offset="1" stop-color="#820BFF" stop-opacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(15, 20, 25, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#0F1419"
                    />
                    <path
                      d="M13.6908 4.0957H15.3769L11.6748 8.7636L16 15.0957H12.6058L9.94835 11.2477L6.90603 15.0957H5.21993L9.14195 10.1031L5 4.0957H8.47851L10.8794 7.61083L13.6908 4.0957ZM13.1006 13.9998H14.0353L7.98734 5.15105H6.98301L13.1006 13.9998Z"
                      fill="white"
                    />
                  </svg>
                </button>

                <button
                  style="margin-top: 40px; cursor: pointer; background: rgba(255, 0, 0, 0.2); border: none; border-radius: 14px; width: 32px; height: 32px"
                >
                  <svg
                    style="display: inline-block; vertical-align: middle"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20.0967C15.5228 20.0967 20 15.6195 20 10.0967C20 4.57383 15.5228 0.0966797 10 0.0966797C4.47715 0.0966797 0 4.57383 0 10.0967C0 15.6195 4.47715 20.0967 10 20.0967Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M15.7449 7.06264C15.6045 6.53783 15.192 6.12541 14.6672 5.98493C13.717 5.73005 9.9048 5.73005 9.9048 5.73005C9.9048 5.73005 6.09267 5.73005 5.14239 5.98493C4.61759 6.12541 4.20516 6.53783 4.06468 7.06264C3.8098 8.01292 3.8098 9.99676 3.8098 9.99676C3.8098 9.99676 3.8098 11.9806 4.06468 12.9309C4.20516 13.4557 4.61759 13.8681 5.14239 14.0086C6.09267 14.2635 9.9048 14.2635 9.9048 14.2635C9.9048 14.2635 13.717 14.2635 14.6672 14.0086C15.192 13.8681 15.6045 13.4557 15.7449 12.9309C15.9998 11.9806 15.9998 9.99676 15.9998 9.99676C15.9998 9.99676 15.9988 8.01292 15.7449 7.06264Z"
                      fill="white"
                    />
                    <path d="M8.68522 11.8245L11.8521 9.99622L8.68522 8.1679V11.8245Z" fill="#FF0000" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="margin-top: 10px; padding-bottom: 20px; margin-bottom: 40px; max-width: 600px; width: 100%; font-family: Mulish, Helvetica, Arial, sans-serif"
        >
          <tbody>
            <tr>
              <td style="text-align: center; vertical-align: center">
                <p style="font-size: 12px; text-decoration: none; line-height: 1; color: #afafaf; margin-top: 0px">
                  If you don't want to receive emails, please
                  <a href="#" style="color: #F9802B; text-decoration: none">unscubscribe</a>
                  .
                </p>
              </td>
            </tr>
          </tbody>
        </table>`,
          }}
        ></div>
      </Grid>
    </Grid>
  );
}
