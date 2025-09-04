const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ScamCategory = require("../models/category.models");
const ScamType = require("../models/scamType.model");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/scamdb";

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // ------------------------------
        // 1️⃣ Seed Categories & SubCategories
        // ------------------------------
        const categories = [
            {
                name: "Financial Scam",
                description: "Scams related to money, banking, and investments",
                subCategories: [
                    { name: "UPI/Bank Fraud", description: "Fraudulent bank transfers, UPI scams" },
                    { name: "Investment/Crypto Scam", description: "Fake investments or crypto schemes" },
                    { name: "Insurance Scam", description: "Fake insurance or claim scams" },
                    { name: "Loan Scam", description: "Fraudulent loan offers" }
                ]
            },
            {
                name: "Social Engineering",
                description: "Scams using psychological manipulation",
                subCategories: [
                    { name: "Romance Scam", description: "Online dating/romance scams" },
                    { name: "Job Scam", description: "Fake jobs, placement fraud" },
                    { name: "Education/Admission Scam", description: "Fake courses or admissions" },
                    { name: "Charity/Donation Scam", description: "Fake donation requests" }
                ]
            },
            {
                name: "E-commerce & Online",
                description: "Scams happening on online platforms",
                subCategories: [
                    { name: "E-commerce/Fake Seller Scam", description: "Fake sellers on e-commerce sites" },
                    { name: "Rental/Home Scam", description: "Fake rental listings or property scams" },
                    { name: "Travel/Tourism Scam", description: "Fake travel deals or bookings" }
                ]
            },
            {
                name: "Other",
                description: "Miscellaneous scams",
                subCategories: [
                    { name: "Tech Support Scam", description: "Fake tech support calls/messages" },
                    { name: "Lottery/Prize Scam", description: "Fake lottery or prize notifications" },
                    { name: "Identity Theft", description: "Identity or personal information fraud" }
                ]
            }
        ];

        for (const category of categories) {
            const exists = await ScamCategory.findOne({ name: category.name });
            if (!exists) {
                await ScamCategory.create(category);
                console.log(`Inserted category: ${category.name}`);
            }
        }

        // ------------------------------
        // 2️⃣ Seed Scam Types
        // ------------------------------
        const scamTypes = [
            { name: "UPI/Bank Fraud", description: "Fraudulent UPI or bank transfers" },
            { name: "Phishing/Email Scam", description: "Phishing emails or fake notifications" },
            { name: "Social Media Scam", description: "Scams via Instagram, Facebook, WhatsApp" },
            { name: "Job Scam", description: "Fake job offers or placement fraud" },
            { name: "Investment/Crypto Scam", description: "Fake investments or crypto schemes" },
            { name: "Romance/Online Dating Scam", description: "Online dating/romance scams" },
            { name: "Lottery/Prize Scam", description: "Fake lottery or prize notifications" },
            { name: "E-commerce/Fake Seller Scam", description: "Fake sellers on e-commerce sites" },
            { name: "Tech Support/Call Center Scam", description: "Fake tech support calls/messages" },
            { name: "Rental/Home Scam", description: "Fake rental listings or property scams" },
            { name: "Charity/Donation Scam", description: "Fake donation requests" },
            { name: "Travel/Tourism Scam", description: "Fake travel deals or bookings" },
            { name: "Insurance Scam", description: "Fake insurance or claim scams" },
            { name: "Education/Admission Scam", description: "Fake courses or admissions" },
            { name: "Identity Theft", description: "Identity or personal information fraud" },
            { name: "Gift Card/Recharge Scam", description: "Fake gift card or recharge scams" },
            { name: "Other", description: "Miscellaneous scams" }
        ];

        for (const type of scamTypes) {
            const exists = await ScamType.findOne({ name: type.name });
            if (!exists) {
                await ScamType.create(type);
                console.log(`Inserted scam type: ${type.name}`);
            }
        }

        console.log("Seeding completed!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
}

seedDatabase();
