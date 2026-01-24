import { KnowledgeEntity } from './knowledge_base';

export const GENERAL_SCIENCE_DATA: Record<string, KnowledgeEntity> = {
  // --- Biology ---
  "human_biology_basics": {
    id: "human_biology_basics",
    title: "Human Biology Impacts",
    shortDescription: "Blood vessels, Coagulation and Vitamins.",
    fullContent: `
- **Blood Vessels**:
    - **Capillaries**: Smallest diameter.
    - **Arteries**: Oxygenated blood (except Pulmonary Artery).
    - **Veins**: Deoxygenated blood (except Pulmonary Vein).
- **Coagulation**: Platelets (Thrombocytes) are responsible for clotting.
- **Vitamins**:
    - **Water-soluble**: B, C.
    - **Fat-soluble**: A, D, E, K.
    `,
    tags: ["science", "biology"]
  },

  // --- Physics & Chemistry ---
  "tungsten_filaments": {
    id: "tungsten_filaments",
    title: "Tungsten and Filaments",
    shortDescription: "Properties of Tungsten (W) in bulbs.",
    fullContent: `
- **Symbol**: W
- **Properties**: 
    - Very high melting point (prevents melting).
    - High resistivity (glows when current passes).
- **Related Concepts**:
    - **Ductility**: Gold is the most ductile metal (1g = long wire).
    - **Short Circuit**: Sudden increase in current.
    - **Fuses**: Low melting point, high resistance (breaks circuit for safety).
    - **Wire Colors**: Red (Live), Black (Neutral), Green (Earth).
    - **Reactions**: 
        - Copper + CO2 = Greenish coating.
        - Silver + Sulfur = Black (Silver Sulfide, Ag2S).
    - **Units**: 
        - 1 Horsepower = 746 Watts.
        - 1 kWh = 3.6 x 10^6 Joules.
    `,
    tags: ["science", "physics", "chemistry"]
  },
  "inert_gases": {
    id: "inert_gases",
    title: "Inert Gases",
    shortDescription: "Noble gases and their uses.",
    fullContent: `
- **Types**: Helium (He), Neon (Ne), Argon (Ar), Krypton (Kr), Xenon (Xe), Radon (Rn).
- **Uses**:
    - **Helium**: Cooling gas in nuclear reactors (and balloons!).
    - **Neon**: Neon lights.
    - **Argon**: Increases electric bulb life.
    - **Krypton/Xenon/Radon**: Colorful advertisement lights.
    `,
    tags: ["science", "chemistry"]
  },

  // --- Biology: Cells & Bacteria ---
  "bacteria_cell_structure": {
    id: "bacteria_cell_structure",
    title: "Bacteria and Cell Structure",
    shortDescription: "Prokaryotic cells features.",
    fullContent: `
- **Bacteria**: Prokaryotic (no nucleus/nuclear membrane).
- **Prokaryotes**: Blue-green algae, PPLOs, Mycoplasma (no cell wall), Bacteria.
- **Genetic Material**: Naked. Small circular DNA called **Plasmids**.
- **Layers**: Glycocalyx (Slime layer/Capsule), Cell Wall (Peptidoglycan), Plasma Membrane.
- **Shapes**: Bacillus (rod), Coccus (spherical), Vibrio (comma), Spirillum (spiral).
- **Flagellum**: Filament, Hook, Basal body.
- **Mesosome**: Acts like mitochondria.
- **Gram Staining**:
    - **Gram-Positive**: Purple/Blue, Thick cell wall, No outer membrane.
    - **Gram-Negative**: Pink/Red, Thin cell wall, Has outer membrane.
- **Methanogens**: Found in ruminant stomachs (make methane).
    `,
    tags: ["science", "biology"]
  },

  // --- Physics ---
  "doppler_effect": {
    id: "doppler_effect",
    title: "Doppler Effect",
    shortDescription: "Change in frequency due to relative motion.",
    fullContent: `
- **Definition**: Apparent change in frequency/wavelength when source or observer moves.
- **Applications**: Police radar guns, Weather forecasting, Medical ultrasound, Astronomy.
- **Example**: Ambulance siren pitch change.
    `,
    tags: ["science", "physics"]
  },

  // --- Ecology & Environment ---
  "ecosystem_basics": {
    id: "ecosystem_basics",
    title: "Ecosystem Basics",
    shortDescription: "Biotic/Abiotic components and Energy Flow.",
    fullContent: `
- **Components**:
    - **Biotic**: Producers (Autotrophs), Consumers (Heterotrophs), Decomposers (Fungi/Bacteria).
    - **Abiotic**: Light, Temp, Water, Soil, Gases.
- **Decomposition Steps**: Fragmentation -> Leaching -> Catabolism -> Humification -> Mineralization.
- **Energy Flow**:
    - **Unidirectional** (Sun is sole source).
    - **10% Law**: Only 10% energy transfers to next level (90% loss).
    - **Trophic Levels**: Producers (1st) -> Herbivores (2nd) -> Carnivores (3rd) -> Top Carnivores (4th).
    `,
    tags: ["science", "ecology"],
    primaryView: "map",
    geoLocations: [{ state: "Madhya Pradesh" }, { state: "Kerala" }]
  },

  // --- Chemistry: Drinks & Water (Data Set 5) ---
  "soft_vs_hard_drinks_water": {
    id: "soft_vs_hard_drinks_water",
    title: "Soft/Hard Drinks & Water",
    shortDescription: "Chemistry of beverages and water hardness.",
    fullContent: `
- **Soft Drinks**: Non-alcoholic (Coke, Pepsi). **H2CO3** (Carbonic acid) from **CO2 in water** gives fizz/tang.
    - **Why CO2?**: Highly soluble, good taste. Hydrogen is explosive (not used!).
- **Hard Drinks**: Alcoholic (Ethanol). Fermentation + Distillation. (Beer 4-8%, Wine 10-15%, Whiskey 30-50%).
- **Soft Water**: Low Ca/Mg. Lathers easily. (Rainwater).
- **Hard Water**: High **Ca/Mg ions**. No lather. Scales boilers. (Well/River water).
    - **Temporary Hardness**: Removed by boiling / Clark's method.
    - **Permanent Hardness**: Removed by Washing soda / Ion exchange / Distillation.
    `,
    tags: ["science", "chemistry"]
  },

  // --- Chemistry: Atomic Structure (Data Set 5) ---
  "atomic_structure": {
    id: "atomic_structure",
    title: "Atomic Structure & Particles",
    shortDescription: "Protons, Electrons, Neutrons and Ions.",
    fullContent: `
- **Structure**: Nucleus (Protons+Neutrons) + Electrons (Orbit).
- **Particles**:
    - **Electron**: Negative. J.J. Thomson.
    - **Proton**: Positive. Ernest Rutherford.
    - **Neutron**: Neutral. James Chadwick.
    - **Gluon**: Holds nucleus together.
    - **Muon**: Unstable lepton (cosmic rays).
- **Ions**: Cation (+ve, lost e-), Anion (-ve, gained e-).
- **Atomic No**: No. of Protons = No. of Electrons.
    `,
    tags: ["science", "chemistry", "physics"]
  },

  // --- General Science Facts (Data Set 5) ---
  "general_science_facts": {
    id: "general_science_facts",
    title: "General Science Facts",
    shortDescription: "Radioactive bananas, Mars gas, and more.",
    fullContent: `
- **Symbols**: No element has symbol 'J'.
- **States**: Hot water can freeze faster than cold (Mpemba effect).
- **Radioactivity**: **Bananas** are radioactive (**K-40**).
- **Medical**: **Iodine-131** treats Goiter.
- **Gases**: 
    - **N2O**: Laughing Gas.
    - **Ozone**: Stops UV-C, partial UV-B, passes UV-A.
    - **Mars Gas**: (Homework Question).
- **Elements**: First man-made: **Technetium (Tc)**.
    `,
    tags: ["science", "facts"]
  },

  // --- Biology: Disorders & Diseases (Data Set 6) ---
  "chromosomal_disorders": {
    id: "chromosomal_disorders",
    title: "Chromosomal Disorders",
    shortDescription: "Trisomy, Monosomy and syndromes.",
    fullContent: `
- **Trisomy**: Extra copy (2n+1). Heightened height, low muscle mass.
- **Monosomy**: Missing copy (2n-1).
- **Down Syndrome**: Trisomy 21.
- **Turner Syndrome**: Monosomy (Missing X).
- **Klinefelter Syndrome**: Extra X (XXY). Gynecomastia, low testosterone.
- **Aneuploidy**: Failure of chromatid segregation.
    `,
    tags: ["science", "biology", "health"]
  },
  "diseases_vectors_immunity": {
    id: "diseases_vectors_immunity",
    title: "Diseases, Vectors & Immunity",
    shortDescription: "Pathogens, Vaccines, and Immune System.",
    fullContent: `
- **Vectors**:
    - **Anopheles**: Malaria (Plasmodium).
    - **Aedes**: Chikungunya, Dengue.
    - **Tsetse Fly**: Sleeping Sickness (Trypanosoma).
    - **Sand Fly**: Leishmaniasis (Kala-azar).
- **Viruses vs Bacteria**:
    - **Viral**: Dengue, Rabies, Polio, Smallpox, AIDS, **MERS**.
    - **Bacterial**: Plague, Diphtheria, Tetanus, Typhoid.
    - **Antibiotics**: Kill bacteria (Penicillin targets cell wall).
- **Immunity**:
    - **Active**: Infection/Vaccine.
    - **Passive**: Mother's milk (Colostrum).
    - **Innate**: Barriers (Skin, Stomach Acid, Tears).
    - **Cells**: B-cells, T-cells. **Basophils** secrete Histamine/Heparin.
    `,
    tags: ["science", "biology", "health"],
    primaryView: "map",
    geoLocations: [{ state: "Odisha" }, { state: "West Bengal" }, { state: "Jharkhand" }]
  },

  // --- Biology: Genetics (Data Set 6) ---
  "genetics_dna_rna": {
    id: "genetics_dna_rna",
    title: "Genetics: DNA & RNA",
    shortDescription: "Structure and function of genetic material.",
    fullContent: `
- **DNA**: Nucleus. Bases: A, T, C, G. Double helix (Hydrogen bonds).
- **RNA**: Cytoplasm. Bases: A, **Uracil**, C, G. First to evolve.
- **Types of RNA**: mRNA (template), tRNA (transfer), rRNA (structural/catalytic).
- **Histones**: Basic proteins (Lysine/Arginine), positively charged. Pack DNA into Nucleosomes.
- **Viruses**: Nucleoproteins. Genetic material is RNA OR DNA (never both).
    `,
    tags: ["science", "biology", "genetics"]
  },

  // --- Botany (Data Set 6) ---
  "botany_classification": {
    id: "botany_classification",
    title: "Botany: Algae & Roots",
    shortDescription: "Algae types and Root systems.",
    fullContent: `
- **Algae**:
    - **Green (Chlorophyceae)**: Cellulose wall.
    - **Brown (Phaeophyceae)**: Cellulose + Algin.
    - **Red (Rhodophyceae)**: Cellulose + Pectin + Polysulfate.
- **Root Systems**:
    - **Tap Root**: Mustard, Carrot, Mango.
    - **Fibrous**: Wheat, Rice, Maize.
    - **Adventitious**: Banyan, Grass.
- **Modifications**:
    - **Conical**: Carrot.
    - **Fusiform (Spindle)**: Radish.
    - **Napiform (Top)**: Turnip.
    `,
    tags: ["science", "botany"]
  },
  "botany_morphology": {
    id: "botany_morphology",
    title: "Botany: Morphology & Tissues",
    shortDescription: "Leaves, Flowers, Fruits and Plant Tissues.",
    fullContent: `
- **Leaves**: Reticulate (Network) vs Parallel Venation.
- **Flowers**: 
    - **Whorls**: Calyx -> Corolla -> Androecium (Male) -> Gynoecium (Female).
    - **Aestivation**: Petal arrangement.
- **Fruits**:
    - **True**: From Ovary.
    - **False**: From other parts (e.g., Apple/Thalamus).
    - **Parthenocarpic**: Without fertilization (Banana).
- **Tissues**:
    - **Epidermis**: Waxy Cuticle, Stomata (Guard & Subsidiary cells), Trichomes (Hairs).
    - **Vascular**: Xylem + Phloem.
        - **Dicots**: Have Cambium (Open/Secondary growth).
        - **Monocots**: No Cambium (Closed).
    `,
    tags: ["science", "botany"]
  }
};
