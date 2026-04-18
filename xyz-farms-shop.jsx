import React, { useState, useEffect, useCallback } from "react";

const products = [
  {
    id: 1,
    name: "Turmeric Powder",
    category: "Vegetable",
    tagline: "Golden Immunity Booster",
    color: "#F59E0B",
    bg: "#FEF3C7",
    emoji: "🌿",
    description: "Sourced from organically grown turmeric roots, processed without additives, fillers, or preservatives. Rich in curcumin — the active compound known for its potent anti-inflammatory and antioxidant effects.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Sourced from organically grown turmeric roots, processed without additives, fillers, or preservatives." },
      { title: "High Curcumin Content", desc: "Rich in curcumin—the active compound known for its potent anti-inflammatory and antioxidant effects." },
      { title: "Vibrant Color & Aroma", desc: "Golden-yellow hue with a fresh, earthy aroma—ideal for premium food products." },
      { title: "Hygienically Processed", desc: "Manufactured under strict quality standards with moisture control and food safety protocols." },
    ],
    uses: [
      { title: "Cooking & Culinary", desc: "Essential in curries, soups, sauces, marinades, and rice dishes." },
      { title: "Health Drinks", desc: 'Used in "golden milk", turmeric teas, and detox smoothies.' },
      { title: "Dietary Supplements", desc: "Popular in capsules and wellness blends for its curcumin content." },
      { title: "Cosmetics & Skincare", desc: "Known for brightening skin, reducing acne, and soothing inflammation in natural face masks and creams." },
      { title: "Soaps & Herbal Products", desc: "Included in soaps and scrubs for its antibacterial and healing properties." },
    ],
    benefits: [
      { title: "Boosts Immunity", desc: "Curcumin supports immune defense and general wellness." },
      { title: "Anti-Inflammatory & Pain Relief", desc: "Reduces joint pain, arthritis symptoms, and internal inflammation." },
      { title: "Liver Detoxification", desc: "Helps flush toxins and supports healthy liver function." },
      { title: "Heart & Circulatory Health", desc: "Supports blood flow and cholesterol management." },
      { title: "Cognitive & Mood Support", desc: "May improve focus, memory, and mood regulation with regular use." },
      { title: "Skin Health", desc: "Treats blemishes, soothes irritation, and promotes even tone when used externally." },
    ],
    price: 249,
    weight: "100g",
  },
  {
    id: 2,
    name: "Garlic Powder",
    category: "Vegetable",
    tagline: "Bold Flavour, Pure Goodness",
    color: "#84CC16",
    bg: "#F7FEE7",
    emoji: "🧄",
    description: "Made from freshly harvested garlic, dried and finely ground without any additives or preservatives. Smooth and uniform powder for easy mixing and consistent flavor.",
    keyFeatures: [
      { title: "100% Natural & Pure", desc: "Made from freshly harvested garlic, dried and finely ground without any additives or preservatives." },
      { title: "Fine Texture", desc: "Smooth and uniform powder for easy mixing and consistent flavor." },
      { title: "Long Shelf Life", desc: "Hygienically processed and packaged to retain freshness and aroma." },
      { title: "Non-GMO & Gluten-Free", desc: "Safe for all dietary preferences and culinary applications." },
      { title: "Export Quality", desc: "Meets international food safety and quality standards." },
    ],
    uses: [
      { title: "Culinary Applications", desc: "Perfect for seasoning soups, sauces, marinades, meats, and vegetables." },
      { title: "Food Industry", desc: "Widely used in processed foods, spice mixes, and ready-to-eat products." },
      { title: "Pickling and Chutneys", desc: "Adds strong garlic flavor without peeling or chopping." },
      { title: "Seasoning Mixes", desc: "Essential ingredient in spice blends and dry rubs." },
      { title: "Instant Food", desc: "Enhances flavor in noodles, snacks, and frozen meals." },
    ],
    benefits: [
      { title: "Health Boosting", desc: "Contains natural compounds that support heart health, immunity, and digestion." },
      { title: "Convenience", desc: "No peeling, chopping, or mess—just sprinkle and cook!" },
      { title: "Preservative Qualities", desc: "Garlic's antimicrobial nature helps extend food shelf life." },
      { title: "Consistent Flavor", desc: "Uniform taste and aroma in every dish, every time." },
    ],
    price: 199,
    weight: "100g",
  },
  {
    id: 3,
    name: "Onion Powder",
    category: "Vegetable",
    tagline: "Rich Depth, Every Dish",
    color: "#F97316",
    bg: "#FFF7ED",
    emoji: "🧅",
    description: "Made from fresh, high-quality onions, dehydrated and finely ground. Blends effortlessly into dishes, sauces, and seasonings — preservative-free with a long shelf life.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from fresh, high-quality onions, dehydrated and finely ground." },
      { title: "Fine, Smooth Texture", desc: "Blends effortlessly into dishes, sauces, and seasonings." },
      { title: "Preservative-Free", desc: "No added chemicals, colors, or fillers." },
      { title: "Long Shelf Life", desc: "Airtight packaging ensures maximum freshness and shelf stability." },
      { title: "Export Grade Quality", desc: "Processed to meet international food safety and quality standards." },
    ],
    uses: [
      { title: "Culinary Seasoning", desc: "Ideal for soups, gravies, curries, marinades, and spice blends." },
      { title: "Processed Foods", desc: "Used in burgers, sausages, dressings, and ready-to-eat meals." },
      { title: "Snacks & Fast Food", desc: "Adds strong onion flavor to chips, fries, and baked snacks." },
      { title: "Dry Mixes & Instant Food", desc: "A go-to ingredient in instant noodles and pre-mixed spice sachets." },
      { title: "Meat & BBQ Rubs", desc: "Essential component in dry rubs and spice coatings." },
    ],
    benefits: [
      { title: "Health Supporting", desc: "Retains antioxidants and compounds known to support immunity and reduce inflammation." },
      { title: "Timesaving", desc: "No peeling or chopping needed—just scoop and sprinkle." },
      { title: "Flavor Consistency", desc: "Provides reliable taste and aroma in every batch." },
      { title: "Easy Storage", desc: "Compact and non-perishable—ideal for all kitchens." },
    ],
    price: 179,
    weight: "100g",
  },
  {
    id: 4,
    name: "Tomato Powder",
    category: "Vegetable",
    tagline: "Sun-Kissed Richness",
    color: "#EF4444",
    bg: "#FEF2F2",
    emoji: "🍅",
    description: "Made from fully ripe, sun-ripened tomatoes, dehydrated and powdered to perfection. No additives or preservatives — free from artificial colors, flavors, and chemicals.",
    keyFeatures: [
      { title: "100% Natural & Sun-Ripened", desc: "Made from fully ripe tomatoes, dehydrated and powdered to perfection." },
      { title: "No Additives or Preservatives", desc: "Free from artificial colors, flavors, and chemicals." },
      { title: "Fine Texture & Deep Red Color", desc: "Enhances both visual appeal and taste of any dish." },
      { title: "Long Shelf Life", desc: "Sealed to retain freshness, color, and nutritional value." },
      { title: "Food-Grade & Export Quality", desc: "Produced under hygienic conditions and complies with global standards." },
    ],
    uses: [
      { title: "Cooking & Sauces", desc: "Perfect for soups, pasta sauces, curries, and gravies." },
      { title: "Snack & Seasoning Blends", desc: "Adds flavor to chips, popcorn, and instant mixes." },
      { title: "Processed Foods", desc: "Used in ketchup, seasonings, and flavoring agents in ready-to-eat meals." },
      { title: "Instant Food & Beverages", desc: "Common in noodle flavor packs, tomato soups, and health drinks." },
      { title: "Canning & Food Manufacturing", desc: "Ideal substitute for fresh or paste tomatoes in industrial kitchens." },
    ],
    benefits: [
      { title: "Rich in Antioxidants", desc: "Contains lycopene and vitamin C that support health and immunity." },
      { title: "Convenient & Easy to Use", desc: "No washing, chopping, or boiling—just sprinkle and mix." },
      { title: "Cost-Effective", desc: "Reduces waste and storage costs compared to fresh tomatoes." },
      { title: "Shelf-Stable", desc: "Can be stored at room temperature with no refrigeration needed." },
    ],
    price: 219,
    weight: "100g",
  },
  {
    id: 5,
    name: "Pumpkin Powder",
    category: "Fruit",
    tagline: "Autumn Gold in a Spoon",
    color: "#F59E0B",
    bg: "#FFFBEB",
    emoji: "🎃",
    description: "Made from mature pumpkins, carefully dehydrated and ground into fine powder. Maintains the deep orange color and sweet, earthy flavor of fresh pumpkin — no additives or fillers.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from mature pumpkins, carefully dehydrated and ground into fine powder." },
      { title: "Rich Color & Flavor", desc: "Maintains the deep orange color and sweet, earthy flavor of fresh pumpkin." },
      { title: "No Additives or Fillers", desc: "Free from preservatives, artificial flavors, and colors." },
      { title: "Shelf-Stable & Lightweight", desc: "Easy to store and transport—ideal for home and commercial use." },
      { title: "Export-Grade Quality", desc: "Produced in compliance with international food safety standards." },
    ],
    uses: [
      { title: "Baking & Cooking", desc: "Ideal for pumpkin pies, bread, muffins, soups, and stews." },
      { title: "Baby Food & Health Mixes", desc: "Adds nutrition and natural sweetness to infant and toddler meals." },
      { title: "Smoothies & Health Drinks", desc: "Blends easily into shakes, smoothies, and protein powders." },
      { title: "Pet Food Industry", desc: "Used in natural pet treats and supplements." },
      { title: "Food Manufacturing", desc: "Common in soups, sauces, seasoning mixes, and instant meals." },
    ],
    benefits: [
      { title: "Nutrient-Dense", desc: "Rich in beta-carotene (vitamin A), fiber, potassium, and antioxidants." },
      { title: "Digestive Support", desc: "High fiber content supports gut health and digestion." },
      { title: "Convenient & Versatile", desc: "Saves time—no peeling, cutting, or boiling required." },
      { title: "No Refrigeration Needed", desc: "Long shelf life and easy storage make it ideal for bulk buyers." },
    ],
    price: 289,
    weight: "100g",
  },
  {
    id: 6,
    name: "Mango Powder",
    category: "Fruit",
    tagline: "Tangy Tropical Zing",
    color: "#EAB308",
    bg: "#FEFCE8",
    emoji: "🥭",
    description: "Made from high-quality, sun-dried raw mango slices, ground into a fine, tangy powder. Pure mango content with no added salt, color, or chemicals.",
    keyFeatures: [
      { title: "100% Natural Mangoes", desc: "Made from high-quality, sun-dried raw mango slices, ground into a fine, tangy powder." },
      { title: "No Preservatives or Additives", desc: "Pure mango content with no added salt, color, or chemicals." },
      { title: "Fine, Free-Flowing Powder", desc: "Easy to mix into dishes, spice blends, and sauces." },
      { title: "Long Shelf Life", desc: "Hygienically processed and sealed for freshness and durability." },
      { title: "Export-Grade Quality", desc: "Manufactured under strict food safety and quality control measures." },
    ],
    uses: [
      { title: "Flavor Enhancer", desc: "Adds tangy zing to curries, lentils, chutneys, and pickles." },
      { title: "Spice Blends", desc: "Key ingredient in chaat masala, curry powders, and dry rubs." },
      { title: "Salads & Dressings", desc: "A natural alternative to lemon juice or vinegar for sourness." },
      { title: "Street Food & Snacks", desc: "Widely used in Indian snacks like samosas, pakoras, chaats, and pani puri." },
      { title: "Marinades", desc: "Tenderizes meat and adds a citrus-like punch to grilled foods." },
    ],
    benefits: [
      { title: "Rich in Antioxidants", desc: "Contains vitamin C, iron, and other plant-based nutrients." },
      { title: "Digestive Support", desc: "Promotes better digestion and metabolism." },
      { title: "Timesaving & Convenient", desc: "Delivers fresh mango flavor year-round, without peeling or chopping." },
      { title: "Shelf-Stable", desc: "Doesn't require refrigeration—perfect for all storage conditions." },
    ],
    price: 269,
    weight: "100g",
  },
  {
    id: 7,
    name: "Papaya Seed Powder",
    category: "Fruit",
    tagline: "Detox & Digest Naturally",
    color: "#78716C",
    bg: "#F5F5F4",
    emoji: "🌱",
    description: "Made from carefully selected papaya seeds, dried and finely milled without additives. Naturally contains papain, alkaloids, and flavonoids for wellness support.",
    keyFeatures: [
      { title: "100% Natural & Pure", desc: "Made from carefully selected papaya seeds, dried and finely milled without additives." },
      { title: "Rich in Enzymes & Phytochemicals", desc: "Naturally contains papain, alkaloids, and flavonoids for wellness support." },
      { title: "No Chemicals or Preservatives", desc: "Free from artificial ingredients, gluten, and GMOs." },
      { title: "Fine, Uniform Texture", desc: "Easy to mix in smoothies, capsules, or health drinks." },
      { title: "Export Quality", desc: "Manufactured under hygienic conditions with adherence to international standards." },
    ],
    uses: [
      { title: "Dietary Supplement", desc: "Used in detox drinks and capsules for its digestive and antiparasitic properties." },
      { title: "Functional Foods", desc: "Can be sprinkled over salads, yogurts, or added to health shakes." },
      { title: "Herbal Remedies", desc: "Incorporated into traditional and modern herbal formulations for liver and gut health." },
      { title: "Animal & Pet Supplements", desc: "Used in natural deworming formulations for pets and livestock." },
      { title: "Teas & Health Mixes", desc: "Brewed or blended into teas for internal cleansing and immunity boosting." },
    ],
    benefits: [
      { title: "Natural Detoxifier", desc: "Helps eliminate toxins and supports liver function." },
      { title: "Digestive Support", desc: "Rich in enzymes like papain, aiding digestion and gut health." },
      { title: "Antimicrobial Properties", desc: "Known to have natural antibacterial and antiparasitic effects." },
      { title: "Supports Weight Management", desc: "Can help regulate metabolism and reduce bloating." },
      { title: "Long Shelf Life", desc: "Stable at room temperature and easy to store." },
    ],
    price: 349,
    weight: "100g",
  },
  {
    id: 8,
    name: "Banana Powder",
    category: "Fruit",
    tagline: "Natural Energy, Pure Taste",
    color: "#FBBF24",
    bg: "#FFFBEB",
    emoji: "🍌",
    description: "Made from sun-ripened bananas, dried and finely ground without any additives. Retains the sweet, fruity taste and aroma of fresh bananas.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from sun-ripened bananas, dried and finely ground without any additives." },
      { title: "Natural Flavor & Aroma", desc: "Retains the sweet, fruity taste and aroma of fresh bananas." },
      { title: "No Artificial Preservatives", desc: "Free from added sugars, colors, or chemicals." },
      { title: "Fine, Uniform Texture", desc: "Easily dissolves in liquids and mixes well in dry ingredients." },
      { title: "Export-Quality Standard", desc: "Produced in compliance with international food safety standards." },
    ],
    uses: [
      { title: "Baby Food & Infant Cereal", desc: "Gentle on digestion and rich in natural nutrition for infants." },
      { title: "Smoothies & Health Drinks", desc: "Adds natural sweetness, creaminess, and energy." },
      { title: "Baking & Cooking", desc: "Used in pancakes, muffins, cakes, and bread for flavor and texture." },
      { title: "Desserts & Ice Creams", desc: "Enhances flavor in yogurts, puddings, and frozen treats." },
      { title: "Pet & Animal Feed", desc: "Added to pet foods as a natural energy source and flavor enhancer." },
    ],
    benefits: [
      { title: "Nutrient Dense", desc: "Rich in potassium, magnesium, fiber, and vitamin B6." },
      { title: "Energy Boosting", desc: "Provides instant energy and supports muscle function." },
      { title: "Convenient & Long-Lasting", desc: "Easy to store, transport, and use—no peeling, mashing, or spoiling." },
      { title: "Shelf-Stable", desc: "Perfect alternative to fresh bananas for long-term storage." },
    ],
    price: 229,
    weight: "100g",
  },
  {
    id: 9,
    name: "Papaya Powder",
    category: "Fruit",
    tagline: "Gut-Friendly Tropical Goodness",
    color: "#FB923C",
    bg: "#FFF7ED",
    emoji: "🍈",
    description: "Made from ripe papaya, dried and finely milled without additives or preservatives. Packed with fiber, vitamins A and C, antioxidants like lycopene and beta-carotene.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from ripe papaya, dried and finely milled without additives or preservatives." },
      { title: "Fine, Uniform Texture", desc: "Smooth powder blends well into drinks and recipes." },
      { title: "Nutrient-Dense", desc: "Packed with fiber, vitamins A and C, antioxidants (like lycopene & beta-carotene), and minerals such as potassium." },
      { title: "Shelf-Stable & Convenient", desc: "No refrigeration needed; easy to store and transport." },
    ],
    uses: [
      { title: "Smoothies & Health Drinks", desc: "Great for gut-soothing morning blends." },
      { title: "Baking & Cooking", desc: "Adds sweet flavor and nutrients to muffins, cakes, and breads." },
      { title: "Functional Food Additive", desc: "Ideal for breakfast bowls, cereals, and protein shakes." },
      { title: "Dietary & Herbal Supplements", desc: "Can be encapsulated or mixed into wellness blends." },
      { title: "Pet Nutritional Support", desc: "Useful in natural pet products; consult vets for dosage guidelines." },
    ],
    benefits: [
      { title: "Improves Digestion & Gut Health", desc: "Papain supports protein breakdown; fiber helps alleviate bloating, heartburn, constipation." },
      { title: "Boosts Immunity & Detoxification", desc: "Antioxidants and vitamin C strengthen immune function and aid liver detox." },
      { title: "Heart-Friendly & Cholesterol Control", desc: "Fiber and potassium support heart health and healthy blood pressure." },
      { title: "Skin & Anti-Inflammatory Properties", desc: "Papain and antioxidants support skin rejuvenation and reduce inflammation." },
      { title: "Weight Management", desc: "Low glycemic, fiber-rich, and may aid metabolism." },
      { title: "Natural Antimicrobial", desc: "Contains compounds that may help combat infections and parasites." },
    ],
    price: 299,
    weight: "100g",
  },
  {
    id: 10,
    name: "Guava Powder",
    category: "Fruit",
    tagline: "Tropical Vitamin C Powerhouse",
    color: "#4ADE80",
    bg: "#F0FDF4",
    emoji: "🍐",
    description: "Made from ripe guavas, gently dried and finely milled without preservatives or additives. Retains the sweet-tart taste and gentle pink hue of fresh guava.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from ripe guavas, gently dried and finely milled without preservatives or additives." },
      { title: "Vibrant Flavor & Color", desc: "Retains the sweet-tart taste and gentle pink hue of fresh guava." },
      { title: "Fine Smooth Texture", desc: "Easy to blend into drinks, foods, and mixes." },
      { title: "Naturally Nutrient-Rich", desc: "Packed with fiber, Vitamin C, antioxidants, and essential phytonutrients." },
      { title: "Long-Shelf Life", desc: "Airtight packaging ensures freshness and stability without refrigeration." },
    ],
    uses: [
      { title: "Smoothies & Health Drinks", desc: "Adds a tropical burst with nutrition and color." },
      { title: "Yogurts / Oat Bowls / Cereal Mixes", desc: "Stir it into breakfast bowls for flavor and natural sweetness." },
      { title: "Baking & Desserts", desc: "Ideal for muffins, cakes, sorbets, and fruit bars." },
      { title: "Beverage & Cocktail Mixes", desc: "Great for mocktails, iced teas, lemonade blends." },
      { title: "Functional Foods & Teas", desc: "Enhance wellness blends with vitamin-rich guava." },
      { title: "Cosmetic & DIY", desc: "Can be used in face masks and scrubs for antioxidant properties." },
    ],
    benefits: [
      { title: "High in Antioxidants & Vitamin C", desc: "Supports immune health and protects cells." },
      { title: "Digestive Support", desc: "Offers natural fiber for gut health and regularity." },
      { title: "Heart-Friendly", desc: "Contains potassium and phytochemicals beneficial to cardiovascular wellness." },
      { title: "Weight-Wise Nutrient Boost", desc: "Turn normal drinks into nutrient-packed options without calories or sugar." },
      { title: "Skin-Boosting Properties", desc: "Applied topically, supports healthy skin with antioxidants and vitamins." },
    ],
    price: 319,
    weight: "100g",
  },
  {
    id: 11,
    name: "Apple Powder",
    category: "Fruit",
    tagline: "Orchard Fresh, Always",
    color: "#DC2626",
    bg: "#FEF2F2",
    emoji: "🍎",
    description: "Made from air- or freeze-dried apples, including skin, milled to a fine, pale powder. Retains vitamin C, potassium, antioxidants, pectin, and dietary fiber.",
    keyFeatures: [
      { title: "100% Whole-Apple Formula", desc: "Made from air- or freeze-dried apples, including skin, milled to a fine, pale powder with excellent shelf stability." },
      { title: "Natural Sweet Flavor", desc: "Offers mild natural sweetness and authentic apple taste without added sugar." },
      { title: "Rich Nutrient Profile", desc: "Retains vitamin C, potassium, antioxidants (polyphenols), pectin, and dietary fiber." },
      { title: "Versatile & Ready to Use", desc: "No preparation needed; easy to blend into dry or liquid recipes." },
    ],
    uses: [
      { title: "Smoothies, Yogurt & Oatmeal", desc: "Natural sweetener and nutritional booster." },
      { title: "Baking & Desserts", desc: "Mix into muffins, pancakes, cakes, and cookies for flavor and moisture." },
      { title: "Sauces & Dressings", desc: "Adds depth and fruity sweetness to savory sauces or dry rubs." },
      { title: "Home-Made Applesauce", desc: "Just stir into water for quick, healthy apple purée." },
      { title: "Emergency Food & On-The-Go Use", desc: "Light, compact, and long-lasting." },
    ],
    benefits: [
      { title: "Supports Gut Health & Regularity", desc: "Rich in fiber and prebiotic pectin, promoting healthy digestion, relieving constipation, and balancing gut bacteria." },
      { title: "Rich in Antioxidants & Vitamin C", desc: "Polyphenols, quercetin, and flavonoids help combat oxidative stress and inflammation." },
      { title: "Promotes Heart Health", desc: "Fiber plus antioxidants help lower cholesterol, support blood pressure, and reduce cardiovascular risk." },
      { title: "Weight Management", desc: "Low calorie yet high fiber, promoting feelings of fullness and helping control calorie intake." },
    ],
    price: 279,
    weight: "100g",
  },
  {
    id: 12,
    name: "Pomegranate Powder",
    category: "Fruit",
    tagline: "Ruby Red Antioxidant Burst",
    color: "#BE123C",
    bg: "#FFF1F2",
    emoji: "🔴",
    description: "Made from ripe, juicy pomegranate arils, gently dried and finely milled with no added sugar or preservatives. Retains the deep red hue and tangy-sweet taste.",
    keyFeatures: [
      { title: "100% Natural & Pure", desc: "Made from ripe, juicy pomegranate arils, gently dried and finely milled with no added sugar or preservatives." },
      { title: "Vibrant Color & Flavor", desc: "Retains the deep red hue and tangy-sweet taste of fresh pomegranate fruit." },
      { title: "High in Nutrients", desc: "Packed with polyphenols, ellagic acid, anthocyanins, vitamin C, potassium." },
      { title: "Fine Texture for Easy Use", desc: "Dissolves well in drinks and mixes easily into foods and recipes." },
      { title: "Long Shelf Life", desc: "Ideal for year-round availability without refrigeration." },
    ],
    uses: [
      { title: "Smoothies & Juices", desc: "Adds color, flavor, and nutrition to health drinks and detox blends." },
      { title: "Baking & Cooking", desc: "Perfect for energy bars, cakes, muffins, and sauces." },
      { title: "Dairy & Frozen Desserts", desc: "Enhances flavor in yogurt, ice cream, and sorbets." },
      { title: "Beverage Mixes", desc: "Great for teas, mocktails, cocktails, and powdered drink blends." },
      { title: "Nutraceuticals & Supplements", desc: "Used in capsules, tablets, and wellness mixes for its antioxidant power." },
    ],
    benefits: [
      { title: "Rich in Antioxidants", desc: "Contains punicalagins and anthocyanins that fight oxidative stress and support cell health." },
      { title: "Heart Health", desc: "May help regulate blood pressure and cholesterol levels." },
      { title: "Anti-Inflammatory Effects", desc: "Supports joint health and immune function by reducing inflammation." },
      { title: "Cognitive Wellness", desc: "Antioxidants in pomegranate may help with memory and brain health." },
      { title: "Skin Glow & Repair", desc: "Promotes skin elasticity and helps reduce signs of aging." },
      { title: "Supports Weight Management", desc: "Naturally low in calories and high in polyphenols and fiber." },
    ],
    price: 359,
    weight: "100g",
  },
  {
    id: 13,
    name: "Hibiscus Powder",
    category: "Flower",
    tagline: "Crimson Bloom Wellness",
    color: "#E11D48",
    bg: "#FFF1F2",
    emoji: "🌺",
    description: "Finely ground from dried Hibiscus sabdariffa petals — free from preservatives and additives. Contains anthocyanins, flavonoids, and vitamin C for natural wellness and skincare.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Finely ground from dried Hibiscus sabdariffa petals—free from preservatives, additives." },
      { title: "Rich Crimson Color & Tangy Aroma", desc: "Maintains the deep red hue and tart, floral scent of fresh hibiscus." },
      { title: "Loaded with Antioxidants", desc: "Contains anthocyanins, flavonoids, and vitamin C for natural wellness and skincare." },
      { title: "Multipurpose Use", desc: "Suitable for health drinks, natural hair care, skin treatments." },
      { title: "Safe & Non-Toxic", desc: "Ideal for regular internal and external use across all skin and hair types." },
    ],
    uses: [
      { title: "Health & Herbal Teas", desc: "Used in hibiscus tea blends for its refreshing flavor and wellness benefits." },
      { title: "Hair Care", desc: "Promotes hair growth, prevents dandruff, and strengthens roots when used in masks and oils." },
      { title: "Skincare Products", desc: "Used in face masks, scrubs, and anti-aging treatments for exfoliation." },
      { title: "Bath & Body Products", desc: "Included in bath bombs, soaps, and body scrubs for vibrant color and skin toning effects." },
      { title: "Natural Food Coloring", desc: "Adds a rich, reddish-pink tint to beverages, jellies, and desserts." },
    ],
    benefits: [
      { title: "Supports Heart Health", desc: "Known to help regulate blood pressure and cholesterol levels when consumed as tea." },
      { title: "Antioxidant Powerhouse", desc: "Fights free radicals, supporting anti-aging and cellular protection." },
      { title: "Boosts Hair Health", desc: "Stimulates hair growth, conditions the scalp, and adds natural shine." },
      { title: "Improves Skin Tone & Texture", desc: "Gently exfoliates dead skin cells, brightens complexion, and retains moisture." },
      { title: "Aids in Digestion & Detox", desc: "Helps in weight management and improves digestion through detoxifying effects." },
      { title: "Natural Cooling Agent", desc: "Traditionally used to balance body heat and reduce inflammation." },
    ],
    price: 399,
    weight: "100g",
  },
  {
    id: 14,
    name: "Rose Petal Powder",
    category: "Flower",
    tagline: "Bloom Into Radiance",
    color: "#FB7185",
    bg: "#FFF1F2",
    emoji: "🌹",
    description: "Made from dried rose petals (Rosa damascena or Rosa centifolia), finely milled without any additives or synthetic ingredients. Contains vitamin C, polyphenols, and natural oils.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from dried rose petals (Rosa damascena or Rosa centifolia), finely milled without any additives or synthetic ingredients." },
      { title: "Rich in Antioxidants & Vitamins", desc: "Contains vitamin C, polyphenols, and natural oils that nourish the skin and support well-being." },
      { title: "Silky Fine Texture", desc: "Easily blends into face masks, bath products, herbal teas, and more." },
      { title: "Naturally Cooling & Soothing", desc: "Used in traditional Ayurvedic and herbal formulations for calming heat and inflammation." },
    ],
    uses: [
      { title: "Cosmetics & Skincare", desc: "Used in face masks, scrubs, lotions, and cleansers for glowing, refreshed skin." },
      { title: "Bath & Body Products", desc: "A fragrant and therapeutic addition to bath salts, soaps, and body powders." },
      { title: "Hair Care", desc: "Mixed into hair masks and pastes to promote shine and reduce scalp irritation." },
      { title: "Herbal Teas & Drinks", desc: "Adds flavor, fragrance, and relaxation properties to teas, lattes, and infusions." },
      { title: "Culinary Use", desc: "Enhances flavor and appearance of desserts, syrups, and confectioneries (food-grade variant only)." },
    ],
    benefits: [
      { title: "Brightens & Rejuvenates Skin", desc: "Natural astringent properties tone, soften, and revitalize the skin." },
      { title: "Reduces Stress & Anxiety", desc: "The floral aroma promotes relaxation and emotional balance." },
      { title: "Antibacterial & Anti-inflammatory", desc: "Helps calm acne, rashes, and irritation while supporting skin healing." },
      { title: "Supports Digestive Health", desc: "In teas, rose petals can aid digestion and relieve bloating." },
      { title: "Cools the Body Naturally", desc: "Used traditionally to reduce heat and calm the skin and mind." },
      { title: "Safe for All Ages", desc: "Gentle enough for baby care products and sensitive skin applications." },
    ],
    price: 429,
    weight: "100g",
  },
  {
    id: 15,
    name: "Chamomile Powder",
    category: "Flower",
    tagline: "Calm, Soothe & Heal",
    color: "#FACC15",
    bg: "#FEFCE8",
    emoji: "🌼",
    description: "Made from finely ground dried Matricaria chamomilla (German chamomile) flowers — free from additives or preservatives. Contains natural compounds known for relaxing, anti-inflammatory, and antioxidant properties.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Made from finely ground dried Matricaria chamomilla (German chamomile) flowers—free from additives or preservatives." },
      { title: "Rich in Apigenin & Flavonoids", desc: "Contains natural compounds known for their relaxing, anti-inflammatory, and antioxidant properties." },
      { title: "Gently Processed", desc: "Dried and milled using low-heat methods to preserve essential oils and active constituents." },
      { title: "Safe for All Ages", desc: "Suitable for use in baby care, sensitive skincare, and wellness products." },
    ],
    uses: [
      { title: "Herbal Teas & Tonics", desc: "Perfect for relaxing herbal teas, bedtime blends, and wellness infusions." },
      { title: "Skincare & Cosmetics", desc: "Used in face masks, creams, serums, and body lotions for its calming and anti-redness effects." },
      { title: "Bath & Body Products", desc: "Ideal in bath soaks, soaps, body powders, and soothing bath bombs." },
      { title: "Herbal Supplements", desc: "Used in powdered capsules and blends to support digestion and calm the nervous system." },
      { title: "Baby Care Products", desc: "Found in baby powders, diaper creams, and gentle soaps for infant skincare." },
    ],
    benefits: [
      { title: "Promotes Relaxation & Sleep", desc: "Naturally calming—commonly used to ease anxiety and promote restful sleep." },
      { title: "Soothes Skin Irritation", desc: "Anti-inflammatory properties help reduce redness, rashes, and eczema." },
      { title: "Antibacterial & Antioxidant", desc: "Supports skin health and immune defense against free radicals and microbes." },
      { title: "Aids Digestion", desc: "Helps relieve indigestion, bloating, and gastrointestinal discomfort." },
      { title: "Safe for Children & Infants", desc: "Mild enough for baby care and gentle health applications." },
      { title: "Supports Healing", desc: "Encourages skin regeneration and reduces inflammation in cuts, burns." },
    ],
    price: 389,
    weight: "100g",
  },
  {
    id: 16,
    name: "Calendula Powder",
    category: "Flower",
    tagline: "Nature's Golden Healer",
    color: "#F97316",
    bg: "#FFF7ED",
    emoji: "🌻",
    description: "Made from dried Calendula officinalis (marigold) petals, finely milled with no chemicals, fillers, or preservatives. Contains flavonoids, triterpenoids, and carotenoids.",
    keyFeatures: [
      { title: "100% Natural & Pure", desc: "Made from dried Calendula officinalis (marigold) petals, finely milled with no chemicals, fillers, or preservatives." },
      { title: "Rich in Bioactive Compounds", desc: "Contains flavonoids, triterpenoids, and carotenoids—natural compounds known for healing and anti-inflammatory properties." },
      { title: "Bright Golden Color & Mild Herbal Aroma", desc: "Retains the vibrant hue and light floral fragrance of fresh calendula flowers." },
      { title: "Gentle & Safe for All Skin Types", desc: "Perfect for sensitive skin and natural personal care products." },
      { title: "Shelf-Stable & Easy to Use", desc: "Long shelf life and versatile in both internal and external applications." },
    ],
    uses: [
      { title: "Skincare & Cosmetics", desc: "Used in face masks, creams, lotions, soaps, balms, and baby products for soothing and healing benefits." },
      { title: "Bath & Body Products", desc: "A popular ingredient in bath soaks, herbal compresses, and body scrubs." },
      { title: "Herbal Teas & Infusions", desc: "Consumed as a mild tea for detox, digestion, and inflammation support." },
      { title: "Nutraceutical & Herbal Formulas", desc: "Incorporated in natural health supplements and wellness blends." },
      { title: "Natural First Aid", desc: "Added to ointments and pastes to treat cuts, bruises, insect bites, and rashes." },
    ],
    benefits: [
      { title: "Soothes Skin Irritation", desc: "Known for calming rashes, eczema, and acne while promoting healing." },
      { title: "Anti-Inflammatory Power", desc: "Helps reduce redness, swelling, and discomfort from skin conditions and minor wounds." },
      { title: "Natural Antimicrobial", desc: "Fights bacteria and fungi, aiding in wound care and skin protection." },
      { title: "Supports Digestive Health", desc: "Herbal infusions may help with gastritis, ulcers, and mild indigestion." },
      { title: "Gentle Detox & Lymphatic Support", desc: "Traditionally used to support liver health and reduce lymph congestion." },
      { title: "Safe for Babies", desc: "Used in natural baby powders, diaper creams, and rash treatments." },
    ],
    price: 419,
    weight: "100g",
  },
  {
    id: 17,
    name: "Lavender Powder",
    category: "Flower",
    tagline: "Serene Floral Tranquility",
    color: "#A855F7",
    bg: "#FAF5FF",
    emoji: "💜",
    description: "Finely ground from dried lavender flowers (Lavandula angustifolia), without additives or fillers. Preserves the gentle, sweet fragrance of lavender — perfect for wellness and beauty products.",
    keyFeatures: [
      { title: "100% Pure & Natural", desc: "Finely ground from dried lavender flowers (Lavandula angustifolia), without additives or fillers." },
      { title: "Soothing Floral Aroma", desc: "Preserves the gentle, sweet fragrance of lavender—perfect for wellness and beauty products." },
      { title: "Fine, Easy-to-Use Texture", desc: "Blends effortlessly into skincare, bath products, teas, and recipes." },
      { title: "Chemical-Free Processing", desc: "Dried and milled using natural methods to retain essential oils and active compounds." },
      { title: "Multi-Purpose Ingredient", desc: "Ideal for aromatherapy, skincare, crafts, teas, and culinary creations." },
    ],
    uses: [
      { title: "Bath & Body Products", desc: "Enhances bath bombs, soaps, body scrubs, and facial masks with soothing, natural fragrance." },
      { title: "Aromatherapy & Relaxation", desc: "Used in sachets, incense, and herbal pillows for its calming effects." },
      { title: "Cosmetics & Skincare", desc: "Ideal for natural creams, lotions, and face masks to reduce acne, redness, and irritation." },
      { title: "Teas & Infusions", desc: "A key ingredient in herbal tea blends and wellness beverages." },
      { title: "Culinary Uses", desc: "Adds a floral twist to cookies, syrups, cakes, and spice blends (in small amounts)." },
      { title: "Crafts & DIY Projects", desc: "Used in candles, potpourri, soaps, and homemade gifts." },
    ],
    benefits: [
      { title: "Reduces Stress & Anxiety", desc: "The natural scent of lavender promotes relaxation and improves sleep quality." },
      { title: "Soothes Skin", desc: "Antibacterial and anti-inflammatory properties make it ideal for treating acne, rashes, and minor burns." },
      { title: "Supports Better Sleep", desc: "Commonly used in bedtime teas or sachets to promote restful sleep." },
      { title: "Digestive Support", desc: "In teas, may help reduce bloating and support healthy digestion." },
      { title: "Antioxidant Rich", desc: "Protects the skin and body from oxidative stress." },
    ],
    price: 449,
    weight: "100g",
  },
];

const categoryColors = {
  Vegetable: { accent: "#16A34A", light: "#DCFCE7", label: "Vegetable" },
  Fruit: { accent: "#EA580C", light: "#FFEDD5", label: "Fruit" },
  Flower: { accent: "#DB2777", light: "#FCE7F3", label: "Flower" },
};

// ─── CART ICON ──────────────────────────────────────────────────────────────
function CartIcon({ count, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", background: "none", border: "none", cursor: "pointer",
      padding: "8px", display: "flex", alignItems: "center", gap: "6px",
      color: "#1a1a1a", fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "15px", fontWeight: 600, transition: "all 0.2s",
    }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <span style={{
          position: "absolute", top: "2px", right: "2px",
          background: "#16A34A", color: "white", borderRadius: "50%",
          width: "18px", height: "18px", fontSize: "11px", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "sans-serif", lineHeight: 1,
        }}>{count}</span>
      )}
    </button>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
function ProductCard({ product, onView, onAddToCart, isInCart }) {
  const [hover, setHover] = useState(false);
  const cat = categoryColors[product.category];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: hover ? "0 20px 60px rgba(0,0,0,0.13)" : "0 4px 20px rgba(0,0,0,0.06)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        border: "1.5px solid",
        borderColor: hover ? product.color + "55" : "#f0f0f0",
      }}
    >
      {/* Color banner */}
      <div
        onClick={() => onView(product)}
        style={{
          background: `linear-gradient(135deg, ${product.bg} 0%, ${product.color}22 100%)`,
          padding: "32px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          minHeight: "160px",
          justifyContent: "center",
        }}
      >
        <div style={{
          fontSize: "56px", lineHeight: 1,
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          transform: hover ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          marginBottom: "12px",
        }}>{product.emoji}</div>
        <span style={{
          background: cat.light,
          color: cat.accent,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: "30px",
          fontFamily: "'DM Sans', sans-serif",
        }}>{cat.label}</span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3
          onClick={() => onView(product)}
          style={{
            margin: 0,
            fontSize: "17px",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.3,
          }}>{product.name}</h3>
        <p style={{
          margin: 0,
          fontSize: "12.5px",
          color: product.color,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.3px",
        }}>{product.tagline}</p>
        <p style={{
          margin: 0,
          fontSize: "13px",
          color: "#666",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{product.description}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
          <div>
            <span style={{ fontSize: "20px", fontWeight: 800, fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>₹{product.price}</span>
            <span style={{ fontSize: "12px", color: "#999", marginLeft: "4px", fontFamily: "'DM Sans', sans-serif" }}>/ {product.weight}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            style={{
              background: isInCart ? "#16A34A" : "#1a1a1a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "9px 16px",
              fontSize: "12.5px",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.25s",
              letterSpacing: "0.3px",
              transform: hover ? "scale(1.03)" : "scale(1)",
            }}
          >
            {isInCart ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────────────────────
function ProductDetail({ product, onBack, onAddToCart, isInCart }) {
  const [activeTab, setActiveTab] = useState("benefits");
  const cat = categoryColors[product.category];

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${product.bg} 0%, ${product.color}18 60%, white 100%)`,
        padding: "48px 0 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "300px", height: "300px",
          background: product.color + "15",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
          <button
            onClick={onBack}
            style={{
              background: "white", border: "1.5px solid #e5e5e5",
              borderRadius: "30px", padding: "8px 18px",
              fontSize: "13px", fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer", color: "#444",
              display: "flex", alignItems: "center", gap: "6px",
              marginBottom: "40px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
            }}
          >
            ← Back to Shop
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>
            {/* Emoji large */}
            <div style={{
              fontSize: "120px", lineHeight: 1,
              filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.12))",
              minWidth: "140px", textAlign: "center",
              animation: "floatEmoji 4s ease-in-out infinite",
            }}>
              {product.emoji}
            </div>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span style={{
                background: cat.light, color: cat.accent,
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "1.5px", textTransform: "uppercase",
                padding: "4px 12px", borderRadius: "30px",
              }}>{cat.label} Powder</span>
              <h1 style={{
                margin: "14px 0 6px",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1,
              }}>{product.name}</h1>
              <p style={{ margin: "0 0 24px", fontSize: "16px", color: product.color, fontWeight: 700, letterSpacing: "0.4px" }}>
                {product.tagline}
              </p>
              <p style={{ margin: "0 0 28px", fontSize: "15px", color: "#555", lineHeight: 1.7, maxWidth: "520px" }}>
                {product.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontSize: "34px", fontWeight: 800, fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>₹{product.price}</span>
                  <span style={{ fontSize: "14px", color: "#888", marginLeft: "6px" }}>/ {product.weight}</span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  style={{
                    background: isInCart ? "#16A34A" : "#1a1a1a",
                    color: "white", border: "none",
                    borderRadius: "14px", padding: "14px 32px",
                    fontSize: "15px", fontWeight: 700,
                    cursor: "pointer", transition: "all 0.25s",
                    letterSpacing: "0.3px",
                    boxShadow: isInCart ? "0 4px 20px #16A34A55" : "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  {isInCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px" }}>
        <div style={{
          display: "flex", gap: "0", marginBottom: "36px",
          background: "white", borderRadius: "16px", padding: "6px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          maxWidth: "500px",
        }}>
          {[
            { id: "benefits", label: "Benefits" },
            { id: "uses", label: "Uses" },
            { id: "features", label: "Key Features" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: "10px 16px",
                border: "none", borderRadius: "12px",
                background: activeTab === tab.id ? product.color : "transparent",
                color: activeTab === tab.id ? "white" : "#666",
                fontSize: "13.5px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.25s",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.2px",
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {activeTab === "benefits" && product.benefits.map((item, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px", padding: "22px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              borderLeft: `4px solid ${product.color}`,
              transition: "transform 0.2s", cursor: "default",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>{item.title}</div>
              <div style={{ fontSize: "13.5px", color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
          {activeTab === "uses" && product.uses.map((item, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px", padding: "22px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              borderTop: `4px solid ${product.color}`,
              transition: "transform 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: product.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                }}>🌿</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>{item.title}</div>
              </div>
              <div style={{ fontSize: "13.5px", color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
          {activeTab === "features" && product.keyFeatures.map((item, i) => (
            <div key={i} style={{
              background: product.bg, borderRadius: "16px", padding: "22px",
              border: `1.5px solid ${product.color}33`,
            }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: product.color, marginBottom: "6px" }}>✦ {item.title}</div>
              <div style={{ fontSize: "13.5px", color: "#555", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}

// ─── CART SIDEBAR ─────────────────────────────────────────────────────────────
function CartSidebar({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", justifyContent: "flex-end",
    }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }} />
      <div style={{
        position: "relative", width: "min(420px, 95vw)",
        background: "white", height: "100vh",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column",
        animation: "slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ padding: "28px 28px 20px", borderBottom: "1.5px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700 }}>
            Your Cart <span style={{ fontSize: "14px", color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>({cart.length} items)</span>
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#666", padding: "4px" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px" }}>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                display: "flex", gap: "14px", padding: "16px 0",
                borderBottom: "1px solid #f5f5f5", alignItems: "center",
              }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: item.bg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "26px", flexShrink: 0,
                }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ fontSize: "13px", color: "#888", fontFamily: "'DM Sans', sans-serif" }}>{item.weight} · ₹{item.price}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "8px", border: "1.5px solid #e5e5e5", background: "white", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#555" }}>−</button>
                    <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "8px", border: "1.5px solid #e5e5e5", background: "white", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#555" }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, fontFamily: "'Playfair Display', serif", color: "#1a1a1a" }}>₹{item.price * item.qty}</div>
                  <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: "12px", marginTop: "6px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "20px 28px 32px", borderTop: "1.5px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
              <span style={{ fontSize: "15px", color: "#666", fontFamily: "'DM Sans', sans-serif" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>₹{total}</span>
            </div>
            <button style={{
              width: "100%", background: "#1a1a1a", color: "white",
              border: "none", borderRadius: "14px", padding: "16px",
              fontSize: "16px", fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer", transition: "all 0.25s",
              letterSpacing: "0.4px",
            }}
              onMouseOver={e => e.currentTarget.style.background = "#333"}
              onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("shop");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const handleRemoveFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleUpdateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter(i => i.qty > 0));
  }, []);

  const viewProduct = useCallback((product) => {
    setSelectedProduct(product);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isInCart = (id) => cart.some(i => i.id === id);

  const categories = ["All", "Vegetable", "Fruit", "Flower"];
  const filtered = products.filter(p => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (page === "detail" && selectedProduct) {
    return (
      <>
        {/* Sticky nav on detail page */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid #f0f0f0",
          padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "64px",
        }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px", color: "#1a1a1a" }}>
            XYZ <span style={{ color: "#16A34A" }}>Farms</span>
          </span>
          <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />
        </nav>
        <ProductDetail
          product={selectedProduct}
          onBack={() => { setPage("shop"); setSelectedProduct(null); }}
          onAddToCart={handleAddToCart}
          isInCart={isInCart(selectedProduct.id)}
        />
        {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={handleRemoveFromCart} onUpdateQty={handleUpdateQty} />}
        {toastMsg && <Toast msg={toastMsg} />}
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(14px)",
        borderBottom: "1.5px solid #f0f0f0",
        padding: "0 clamp(16px, 4vw, 48px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "28px" }}>🌿</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", color: "#1a1a1a" }}>
            XYZ <span style={{ color: "#16A34A" }}>Farms</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>Premium Natural Powders</span>
          <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 40%, #FEF9C3 100%)",
        padding: "72px clamp(16px, 4vw, 48px) 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "#16A34A15", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "250px", height: "250px", background: "#EAB30815", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{
            background: "#DCFCE7", color: "#16A34A",
            fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", padding: "5px 14px", borderRadius: "30px",
            display: "inline-block", marginBottom: "18px",
          }}>100% Organic · Chemical-Free · Export Grade</span>
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(36px, 6vw, 68px)",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900, color: "#1a1a1a", lineHeight: 1.05,
            letterSpacing: "-1.5px",
          }}>
            Nature's Finest,<br />
            <span style={{ color: "#16A34A" }}>Powdered Perfectly</span>
          </h1>
          <p style={{ margin: "0 auto 32px", maxWidth: "560px", fontSize: "17px", color: "#555", lineHeight: 1.7, fontWeight: 400 }}>
            Premium organic powders from Gauribidanur — preserving the natural colour, flavour, and nutritional value of every ingredient.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            {["🌿 Vegetable", "🍊 Fruit", "🌸 Flower"].map(tag => (
              <span key={tag} style={{
                background: "white", borderRadius: "30px", padding: "8px 18px",
                fontSize: "13px", fontWeight: 600, color: "#444",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FILTERS + SEARCH */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "32px clamp(16px, 4vw, 32px) 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "9px 20px", borderRadius: "30px",
                border: "1.5px solid",
                borderColor: filter === cat ? "#1a1a1a" : "#e0e0e0",
                background: filter === cat ? "#1a1a1a" : "white",
                color: filter === cat ? "white" : "#555",
                fontSize: "13.5px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >{cat}</button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <input
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "10px 16px 10px 40px",
              border: "1.5px solid #e0e0e0",
              borderRadius: "30px", fontSize: "13.5px",
              outline: "none", width: "220px",
              fontFamily: "'DM Sans', sans-serif",
              background: "white", color: "#333",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#16A34A"}
            onBlur={e => e.target.style.borderColor = "#e0e0e0"}
          />
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.5 }}>🔍</span>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "28px clamp(16px, 4vw, 32px) 64px",
      }}>
        <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px", fontWeight: 500 }}>
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {filter !== "All" ? ` in ${filter}` : ""}
          {search ? ` for "${search}"` : ""}
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={viewProduct}
              onAddToCart={handleAddToCart}
              isInCart={isInCart(product.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌱</div>
            <p style={{ fontSize: "16px", fontWeight: 500 }}>No products found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#1a1a1a", color: "#aaa",
        padding: "40px clamp(16px, 4vw, 48px)",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "white", fontWeight: 700, marginBottom: "8px" }}>
          🌿 XYZ <span style={{ color: "#4ADE80" }}>Farms</span>
        </div>
        <p style={{ margin: "0 0 4px", fontSize: "13px" }}>Premium Natural Powders · Gauribidanur, Karnataka, India</p>
        <p style={{ margin: 0, fontSize: "13px" }}>📞 +91 XXXXX XXXXX · ✉ info@xyzfarms.com</p>
      </footer>

      {/* CART SIDEBAR */}
      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={handleRemoveFromCart} onUpdateQty={handleUpdateQty} />}

      {/* TOAST */}
      {toastMsg && <Toast msg={toastMsg} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}

function Toast({ msg }) {
  return (
    <div style={{
      position: "fixed", bottom: "28px", left: "50%",
      transform: "translateX(-50%)",
      background: "#1a1a1a", color: "white",
      padding: "12px 24px", borderRadius: "30px",
      fontSize: "14px", fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      zIndex: 9999,
      animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      ✓ {msg}
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}
