
// Shared image references hotlinked from the original HTML mockups.
const A = "https://lh3.googleusercontent.com/aida-public/";
export const IMG = {
  hero: A + "AB6AXuC2-7QZ0yyuJjztqDxh8riUJ6-uxnS5DvbPWHlk1Ca0a2ALcA5asqQ-54Z6WIk6zzfyAFyX8b4DAnNjsxiUsYUscs_GD9CUXoOA53CJAcxCKlP6kHJAN45I4Udhzj3_2Xx61gv-lTFx9yEhFHZYAw1hSGlSbJzdqgi0zOjuRYFBTSKjZ1uk7gjJ15E2tddqdduDbibY6HqjLLFQAzhnR4yVZ3qiwzN81_Hp9avzuszVuAnfcCAuwoLiqADiUOW0ETAQNk85v8DzDnU",
  trust: A + "AB6AXuC6pjnQ8CXt0oud7V5LZSzpgc63mKx5GC004_ikGfBV2aUlvwjQMud-BTdL-qbiNYg4HM_tyx7GJ6XKlH91LZaFDtWOV9DqkH0Ds8F4a6XSBnf-dCy-nixY6k8c5XnRy03AEHujBzJq11JaDGmpLIXwk_AS0bcajdyAEtsx6JZ_CXrSYlSUeyY51Ey9VM_IqEtvs_FXrJ9GO0EaaEJZZRlg9KF-O-hSIEzsgCFgdorVrg82vcBSm71JlGIGm-2V8SlKsbm8VeJ4i6E",
  faceOil: A + "AB6AXuAQfRJwv1Xb6I-IFnyy2EKoulNGjLvUulC9Crl07IpYwNWfK0A2v3Eo8HorTKTW0Bbz0V2gb5pXWD_jdzEXt3es1HW6uP3MxMC4mcD4tbrvBZaS6ynqe0twAYtIHtWzneYQwj95nwMUitNW5gjOmsUm2eJad7x4zjR03EqzRhFJ50qgH5QwWN1Aa2FZdHIPUGcRpEmeFzw6LXP9CpfQ6pQV6d2xHUD_0bT0Q9JA7v16T0I9r2uDm-mX3tWA_-mCBp739zahIqTAkvs",
  powder: A + "AB6AXuB05hpJLG59gXzTieixMZePrnSgzi3wIA3HG432wz1VVUF3smdlsorH-q7VBhr9m66l2RnF7Z4zjvyxTgDojz7MwJhxBokMAs_4NIZO-QKXSz0gwMcafyPRhj_e2bJ9cRGgYtFz7QS_fUFRUkRi5UDedAqYavMN98-iYVpFIbv_2VwwQ0vxKGQ7KPgqcaXzqFFHFhfFSnKdx5_Xqn0urJ-4MMex9mgJQ62F82kgzXoJ2MAb2mv7a0FHp6rXaIbfL7fJUY6-TMsqkug",
  serum: A + "AB6AXuAoAfn-VZ12KVYMg0ZLJFQGmnX9lcnvGabBwCF_Gwzt04aHBai61-0dS5-furtqtFwTSg12LQwWMjR3O1zS3X_nqNqgl0dQHSjwYDJV0drhn8g7BnoI2vKyhbHNx5d-ss38KdeRFU_ae2MFvGOoaWFGrTxduaAaITp_jwGC7Y0noaEwVwPUuNOTCijqOpE-2H2x_BSEn4ef7n0HBO7C9w6x6MO3b5TxeVBn5uUzLJUUgiN2ujrXFLN2Hry-jXWrvPZAC1zacp25wfM",
  yoga: A + "AB6AXuAkG4L3nMbPGkhhuUA4OUIgZtEMux7Qu8czrPf_jwFrIOXNqq5qObPvv8shsrLacIgGv3OfT9z7kUbI-FH_qgFWMhjtJXcnrc4OnZkXT9qL7VteNMkvpotWyy-Qj55QVjPVgknjW5_yon55inQFHjZ2iTHnwQsYkRPuDITa-_g0_SM0SukCvGzz_e8R9VUaG_g2Htr3E1OfLuFe5bIEp1R4Em4vtKNgwRpKjkOpPOyjGadubFQTNt1cl06uNekOzQd17pi4ikGCz7I",
  tea: A + "AB6AXuDip7dKAPBXGP6bSXLPLRhVp5HY3SvbzylwIuQloNYo8lh1H0G2PWJxMyD56KvNMCXWNSYHKnbyVR1TwouYCHb2c4m1VdbNJ1ZTYyll3nqvR_fprKRaK5jH3z4jNPDM3B9REkSvt2CVoJHfgdh2OBFXfCELC1zPakml95vLjdOQvqheTuq9u_a7r9H2eR6Y6iRO1K6aGjwmpz9V5G_9GPQmgJgSsIKgEuTViQqNkK_nKdmP94zGwg1GIZArXCIKG610I7iow1sHEnU",
};

export const PRODUCTS = [
  { slug: "haldi-soap", name: "Handcrafted Haldi Soap", tag: "Cold-Pressed", subtitle: "Turmeric & Shea Brightening Bar", price: 1850, image: IMG.faceOil, wooId: 101 },
  { slug: "ashwagandha-churna", name: "Ashwagandha Churna", tag: "Organic", subtitle: "Adaptogenic Support", price: 950, image: IMG.powder, wooId: 102 },
  { slug: "bhringraj-elixir", name: "Bhringraj Elixir", tag: "Vegan", subtitle: "Revitalizing Hair Serum", price: 1400, image: IMG.serum, wooId: 103 },
  { slug: "neem-tulsi-bar", name: "Neem & Tulsi Bar", tag: "Purifying", subtitle: "Cold-Process Soap", price: 1500, image: IMG.faceOil, wooId: 104 },
  { slug: "brahmi-radiance-cream", name: "Brahmi Radiance Cream", tag: "Hydrating", subtitle: "Deep Hydration", price: 3500, image: IMG.powder, wooId: 105 },
  { slug: "damask-rose-mist", name: "Damask Rose Mist", tag: "Toning", subtitle: "Facial Spritz", price: 2000, image: IMG.serum, wooId: 106 },
];

