import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { FileText } from "lucide-react";
import { CONTACT_INFO } from "@/constant";

export const Route = createFileRoute("/terms")({
    head: () => ({
        meta: [
            { title: "Terms & Conditions — Shrutibhyam Wellness" },
            {
                name: "description",
                content:
                    "Read the Terms and Conditions governing the use of Shrutibhyam Wellness and the purchase of handcrafted cold-process Ayurvedic soaps.",
            },
        ],
    }),
    component: TermsOfService,
});

function TermsOfService() {
    return (
        <SiteLayout>
            <section className="bg-cream-bg animate-fade-in">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
                    <div className="w-12 h-12 rounded-full bg-soft-beige flex items-center justify-center text-sage-green mx-auto mb-4">
                        <FileText size={24} />
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">
                        Terms & Conditions
                    </h1>

                    <p className="text-base text-on-surface-variant max-w-3xl mx-auto">
                        Last updated: <strong>13 July 2026</strong>
                    </p>

                    <p className="mt-4 text-sm text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                        These Terms and Conditions govern your access to and use
                        of Shrutibhyam Wellness and your purchase of handcrafted
                        cold-process soaps and related products sold under
                        Shrutibhyam Soaps. By placing an order, creating an
                        account, or using our website, you agree to these Terms.
                        If you do not agree, please do not use our website or
                        purchase our products.
                    </p>
                </div>
            </section>

            <section className="max-w-[850px] mx-auto px-4 md:px-6 py-16 space-y-12 animate-fade-in">
                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        1. About Us
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Shrutibhyam Soaps is a handcrafted, cold-process
                        Ayurvedic and nature-rooted skincare line operated under
                        Shrutibhyam Wellness. Our business is registered for GST
                        and under the Udyam/MSME framework, and our brand name
                        is trademark protected.
                    </p>

                    <p className="text-sm text-on-surface-variant">
                        <strong>Email:</strong>{" "}
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="underline hover:text-sage-green"
                        >
                            {CONTACT_INFO.email}
                        </a>
                    </p>

                    <p className="text-sm text-on-surface-variant">
                        <strong>Location:</strong> Gurugram, Haryana, India
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        2. Products and Handcrafted Nature
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Our products are handmade in small batches using the
                        cold-process soap-making method.
                    </p>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                        <li>
                            Minor variations in colour, shape, weight, texture,
                            and fragrance are natural and are not defects.
                        </li>

                        <li>
                            Natural and Ayurvedic ingredients, including
                            essential oils and botanical extracts, may cause
                            slight variations between batches and throughout the
                            product's shelf life.
                        </li>

                        <li>
                            A natural soda ash or slight surface bloom may
                            appear on cold-process soaps. This is cosmetic only
                            and does not affect quality, safety, or performance.
                        </li>

                        <li>
                            Product images are for representation purposes.
                            Actual products may vary slightly because of
                            lighting, screen settings, and their handmade
                            nature.
                        </li>
                    </ul>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        3. No Medical Claims
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Our products are cosmetic skincare items intended for
                        external use only. They are not intended to diagnose,
                        treat, cure, or prevent any disease or medical
                        condition. References to Ayurvedic ingredients,
                        traditional wellness, or botanical benefits are
                        descriptive and should not be interpreted as medical or
                        clinical claims.
                    </p>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        If you have allergies, skin sensitivities, or existing
                        skin conditions, carefully review the ingredient list,
                        perform a patch test before use, and consult a
                        dermatologist if necessary. Discontinue use immediately
                        if irritation, redness, or discomfort occurs.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        4. Orders and Pricing
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                        <li>
                            All orders are subject to acceptance and product
                            availability.
                        </li>

                        <li>
                            Prices are displayed in Indian Rupees (INR) and are
                            inclusive of applicable GST unless stated otherwise.
                        </li>

                        <li>
                            We reserve the right to correct pricing errors,
                            modify prices, or discontinue products without prior
                            notice. Confirmed orders will not be affected.
                        </li>

                        <li>
                            Promotional offers and discount codes are subject to
                            their own validity periods and terms and may be
                            modified or withdrawn at any time.
                        </li>
                    </ul>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        5. Payments
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Payments are processed through secure third-party
                        payment gateways. We do not store your payment card or
                        banking credentials. Orders are processed only after
                        successful payment confirmation, except where Cash on
                        Delivery is available.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        6. Shipping and Delivery
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                        <li>
                            Delivery timelines are estimates and may vary due to
                            courier services, logistics, weather, or other
                            circumstances beyond our control.
                        </li>

                        <li>
                            Shipping charges, where applicable, are displayed at
                            checkout.
                        </li>

                        <li>
                            Risk in the products passes to you upon delivery to
                            the shipping address provided by you.
                        </li>

                        <li>
                            Please ensure your address and contact details are
                            accurate. We are not responsible for delays or
                            failed deliveries caused by incorrect information.
                        </li>

                        <li>
                            We currently ship only within India.
                        </li>
                    </ul>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        7. Returns, Refunds & Cancellations
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                        <li>
                            Due to hygiene and safety reasons, opened or used
                            products cannot be returned or exchanged unless
                            there is a genuine manufacturing defect or transit
                            damage.
                        </li>

                        <li>
                            Damaged, defective, or incorrect products must be
                            reported within 48 hours of delivery along with the
                            order number and photographic evidence.
                        </li>

                        <li>
                            Approved refunds will be processed to the original
                            payment method within a reasonable number of
                            business days. A replacement or store credit may be
                            offered where appropriate.
                        </li>

                        <li>
                            Orders may be cancelled before dispatch. Orders that
                            have already been shipped cannot be cancelled.
                        </li>
                    </ul>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        8. Intellectual Property
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        All website content, including the Shrutibhyam name,
                        logo, product names, packaging, photographs, graphics,
                        and text, is the intellectual property of Shrutibhyam
                        Wellness and is protected under applicable trademark and
                        copyright laws. No content may be copied, reproduced,
                        distributed, or commercially used without prior written
                        permission.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        9. User Conduct
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
                        <li>
                            Do not provide false, misleading, or fraudulent
                            information while placing orders.
                        </li>

                        <li>
                            Do not use the website for unlawful purposes or in a
                            manner that could damage or disrupt our systems.
                        </li>

                        <li>
                            Do not attempt unauthorized access to our website,
                            servers, or associated systems.
                        </li>
                    </ul>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        10. Limitation of Liability
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        To the fullest extent permitted by law, Shrutibhyam
                        Wellness shall not be liable for indirect, incidental,
                        or consequential damages arising from the use of our
                        products or website, including allergic reactions from
                        undisclosed sensitivities, misuse of products, or delays
                        caused by third-party logistics providers. Our total
                        liability shall not exceed the amount paid for the
                        relevant order.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        11. Privacy
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        Personal information collected during purchases is used
                        solely for order processing, customer communication, and
                        service improvement. Information will not be sold or
                        shared except where necessary for payment processing,
                        courier services, or where required by law.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        12. Governing Law & Jurisdiction
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        These Terms shall be governed by the laws of India. Any
                        disputes arising from these Terms or your use of the
                        website shall be subject to the exclusive jurisdiction
                        of the courts located in Gurugram, Haryana.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        13. Changes to These Terms
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        We reserve the right to update or modify these Terms at
                        any time. Updated Terms become effective immediately upon
                        publication on the website. Continued use of the website
                        constitutes acceptance of the revised Terms.
                    </p>
                </article>

                <article className="space-y-4">
                    <h2 className="font-display text-2xl text-primary">
                        14. Contact Us
                    </h2>

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                        If you have any questions, concerns, or complaints
                        regarding these Terms or our products, please contact
                        us:
                    </p>

                    <p className="text-sm">
                        <strong>Email:</strong>{" "}
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="underline hover:text-sage-green transition-colors"
                        >
                            {CONTACT_INFO.email}
                        </a>
                    </p>

                    <p className="text-sm text-on-surface-variant">
                        <strong>Location:</strong> Gurugram, Haryana, India
                    </p>
                </article>
            </section>
        </SiteLayout>
    );
}