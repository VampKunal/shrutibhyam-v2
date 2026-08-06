import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sanityClient, queries } from "../sanity/client";

export const getProductEnrichment = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    try {
      const enrichment = await sanityClient.fetch(queries.productEnrichment, { slug });
      return enrichment || null;
    } catch (error) {
      console.error(`Error fetching Sanity enrichment for slug "${slug}":`, error);
      return null;
    }
  });

export const getFaqs = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const faqs = await sanityClient.fetch(queries.faqs);
      return faqs || [];
    } catch (error) {
      console.error("Error fetching FAQs from Sanity:", error);
      return [];
    }
  });

export const getSiteSettings = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const settings = await sanityClient.fetch(queries.siteSettings);
      return settings || null;
    } catch (error) {
      console.error("Error fetching site settings from Sanity:", error);
      return null;
    }
  });

export const getEvents = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const events = await sanityClient.fetch(queries.events);
      return events || [];
    } catch (error) {
      console.error("Error fetching events from Sanity:", error);
      return [];
    }
  });

export const getHomeData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const home = await sanityClient.fetch(queries.home);
      return home || null;
    } catch (error) {
      console.error("Error fetching home from Sanity:", error);
      return null;
    }
  });

export const getAboutData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const about = await sanityClient.fetch(queries.about);
      return about || null;
    } catch (error) {
      console.error("Error fetching about from Sanity:", error);
      return null;
    }
  });

export const getYogaData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const yoga = await sanityClient.fetch(queries.yoga);
      return yoga || null;
    } catch (error) {
      console.error("Error fetching yoga from Sanity:", error);
      return null;
    }
  });
