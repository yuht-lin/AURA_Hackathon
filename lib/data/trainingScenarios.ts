export interface TrainingScenario {
  id: string;
  language: "en" | "hi" | "as";
  languageLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  senderHeader: string;
  messageText: string;
  isScam: boolean;
  correctAnswerExplanation: string;
  keyIndicators: string[];
  cognitiveTrap: string;
  safeResponseGuide: string;
}

export const TRAINING_SCENARIOS: TrainingScenario[] = [
  // Assamese (অসমীয়া) Scenarios
  {
    id: "TRN-AS-01",
    language: "as",
    languageLabel: "অসমীয়া (Assamese)",
    difficulty: "Beginner",
    title: "বিজুলী সংযোগ বিচ্ছিন্নৰ ভুৱা সতৰ্কবাৰ্তা (APDCL Scam)",
    senderHeader: "+91 9876543210 (ব্যক্তিগত নম্বৰ)",
    messageText: "প্ৰিয় গ্ৰাহক, আপোনাৰ বিদ্যুৎ বিল আপডেট নোহোৱাৰ বাবে আজি ৰাতি ৯:৩০ বজাত আপোনাৰ বিজুলীৰ সংযোগ বিচ্ছিন্ন কৰা হ'ব। অনুগ্ৰহ কৰি লগে লগে আমাৰ বিষয়া শৰ্মা ডাঙৰীয়াক 9876543210 নম্বৰত যোগাযোগ কৰক।",
    isScam: true,
    correctAnswerExplanation: "এইটো এটা প্ৰৱঞ্চনামূলক মেছেজ। APDCL বা চৰকাৰী বিদ্যুৎ বিভাগে কেতিয়াও কোনো ব্যক্তিগত ১০-ডিজিটৰ মোবাইল নম্বৰৰ পৰা এনেধৰণৰ ভাবুকিপূৰ্ণ মেছেজ নিদিয়ে।",
    keyIndicators: [
      "ৰাতি ৯:৩০ বজাত সংযোগ বিচ্ছিন্ন কৰাৰ কৃত্ৰিম ভাবুকি",
      "চৰকাৰী হেল্পলাইনৰ পৰিৱৰ্তে ব্যক্তিগত ফোন নম্বৰ দিয়া হৈছে",
      "ভয় আৰু জৰুৰী পৰিস্থিতি সৃষ্টি কৰি আতংক সৃষ্টিৰ চেষ্টা"
    ],
    cognitiveTrap: "জৰুৰী সেৱা কৰ্তনৰ ভয় দেখুৱাই অযথা আতংক সৃষ্টি কৰা।",
    safeResponseGuide: "কোনো ব্যক্তিগত নম্বৰত ফোন নকৰিব। সদায় APDCL ৰ অফিচিয়েল 1912 হেল্পলাইন বা নিজৰ গ্ৰাহক প'ৰ্টেলত পৰীক্ষা কৰক।"
  },
  {
    id: "TRN-AS-02",
    language: "as",
    languageLabel: "অসমীয়া (Assamese)",
    difficulty: "Intermediate",
    title: "বেংক একাউণ্ট বন্ধৰ ভাবুকি (SBI KYC Scam)",
    senderHeader: "VK-SBISMS",
    messageText: "সতৰ্কবাৰ্তা: আপোনাৰ SBI একাউণ্টৰ KYC ম্যাদ উকলিছে। একাউণ্ট বন্ধ হোৱাৰ পৰা ৰক্ষা কৰিবলৈ ২৪ ঘণ্টাৰ ভিতৰত ইয়াত ক্লিক কৰক: http://sbi-kyc-update-portal.xyz/verify",
    isScam: true,
    correctAnswerExplanation: "মেছেজটো 'SBI' নামত আহিলেও লিংকটো এটা ভুৱা '.xyz' ডমেইন। ভাৰতীয় ষ্টেট বেংকৰ অফিচিয়েল ডমেইন কেৱল 'sbi.co.in' বা 'onlinesbi.sbi'।",
    keyIndicators: [
      "অনুমোদিত নোহোৱা .xyz ডমেইন লিংক",
      "২৪ ঘণ্টাৰ ভিতৰত একাউণ্ট বন্ধৰ ভাবুকি",
      "বেংকে কেতিয়াও মেছেজৰ লিংকৰ জৰিয়তে KYC আপডেট কৰিবলৈ নকয়"
    ],
    cognitiveTrap: "একাউণ্ট বন্ধ হোৱাৰ ভয় দেখুৱাই গ্ৰাহকক ক্লিক কৰিবলৈ বাধ্য কৰা।",
    safeResponseGuide: "লিংকত কেতিয়াও ক্লিক নকৰিব। বেংকৰ ওচৰৰ শাখালৈ যাওক বা অফিচিয়েল YONO এপ ব্যৱহাৰ কৰক।"
  },
  {
    id: "TRN-AS-03",
    language: "as",
    languageLabel: "অসমীয়া (Assamese)",
    difficulty: "Beginner",
    title: "অৰ্ডাৰ ডেলিভাৰীৰ অফিচিয়েল বাৰ্তা (Safe Control)",
    senderHeader: "AMAZON",
    messageText: "আপোনাৰ Amazon অৰ্ডাৰ #402-9182374 আজি ডেলিভাৰী হ'ব। ডেলিভাৰী এচ'চিয়েট ৰাহুলক আপোনাৰ ওটিপি 4829 কওক। আপোনাৰ অৰ্ডাৰ amazon.in ত ট্ৰেক কৰক।",
    isScam: false,
    correctAnswerExplanation: "এইটো এটা বৈধ ডেলিভাৰী বাৰ্তা। ইয়াত কোনো অজ্ঞাত পেমেন্ট বা ভুৱা লিংক দিয়া হোৱা নাই আৰু অফিচিয়েল amazon.in ৱেবচাইটৰ উল্লেখ আছে।",
    keyIndicators: [
      "অফিচিয়েল amazon.in ডমেইন",
      "টকা বা গোপন পিন খোজা হোৱা নাই",
      "কেৱল সামগ্ৰী গ্ৰহণ কৰাৰ সময়তহে ওটিপি দিবলৈ কোৱা হৈছে"
    ],
    cognitiveTrap: "কোনো ভাবুকি বা লোভ দেখুওৱা হোৱা নাই।",
    safeResponseGuide: "সামগ্ৰী পোৱাৰ পিছতহে ডেলিভাৰী ব্যক্তিজনক কোডটো কওক।"
  },

  // Hindi (हिन्दी) Scenarios
  {
    id: "TRN-HI-01",
    language: "hi",
    languageLabel: "हिन्दी (Hindi)",
    difficulty: "Beginner",
    title: "बिजली बिल भुगतान की फर्जी धमकी (Electricity Scam)",
    senderHeader: "+91 9712345678",
    messageText: "प्रिय उपभोक्ता, आपका बिजली बिल अपडेट न होने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी। तुरंत हमारे बिजली अधिकारी से 9712345678 पर संपर्क करें।",
    isScam: true,
    correctAnswerExplanation: "यह एक धोखाधड़ी है। बिजली विभाग कभी भी 10 अंकों के व्यक्तिगत मोबाइल नंबर से ऐसी धमकी नहीं भेजता।",
    keyIndicators: [
      "निजी मोबाइल नंबर से भेजा गया संदेश",
      "रात 9:30 बजे बिजली काटने की धमकी",
      "अनाधिकृत नंबर पर कॉल करने का दबाव"
    ],
    cognitiveTrap: "तत्काल सेवा बंद होने का डर दिखाकर घबराहट पैदा करना।",
    safeResponseGuide: "दिए गए नंबर पर कॉल न करें। आधिकारिक 1912 हेल्पलाइन या बिजली बोर्ड की वेबसाइट पर जांचें।"
  },
  {
    id: "TRN-HI-02",
    language: "hi",
    languageLabel: "हिन्दी (Hindi)",
    difficulty: "Intermediate",
    title: "घर बैठे यूट्यूब वीडियो लाइक करने का काम (Job Scam)",
    senderHeader: "TELEGRAM",
    messageText: "बधाई हो! आपको वर्क फ्रॉम होम के लिए चुना गया है। यूट्यूब वीडियो लाइक करके रोजाना 3,000-8,000 रु कमाएं। तुरंत जॉइन करें: https://t.me/part_time_job_india",
    isScam: true,
    correctAnswerExplanation: "यह पिंग-बुचरिंग टास्क स्कैम है। शुरुआत में छोटे पैसे देकर बाद में लाखों रुपये जमा कराने के लिए फंसाया जाता है।",
    keyIndicators: [
      "अवास्तविक दैनिक आय का झूठा लालच",
      "टेलीग्राम चैनल पर ले जाने का प्रयास",
      "बिना किसी साक्षात्कार या योग्यता के चयन का दावा"
    ],
    cognitiveTrap: "आसान काम से भारी कमाई का लालच।",
    safeResponseGuide: "टेलीग्राम लिंक पर न जाएं और किसी भी तथाकथित टास्क के लिए पैसे जमा न करें।"
  },

  // English Scenarios
  {
    id: "TRN-EN-01",
    language: "en",
    languageLabel: "English",
    difficulty: "Advanced",
    title: "India Post Failed Delivery Reschedule (Smishing)",
    senderHeader: "+91 8829103948",
    messageText: "India Post: Your package #IN98410294 could not be delivered due to an incorrect house address number. Please update your details and pay Rs. 15 re-dispatch charges here: http://ind-post-redelivery.top/track within 12 hours.",
    isScam: true,
    correctAnswerExplanation: "India Post never uses personal mobile numbers to notify users, nor does it host services on .top domains. The official domain is indiapost.gov.in.",
    keyIndicators: [
      "Sent from personal 10-digit mobile number",
      "Suspicious commercial .top domain instead of government .gov.in",
      "Nominal fee of ₹15 designed to capture credit card credentials"
    ],
    cognitiveTrap: "Curiosity about an unexpected parcel paired with a tiny friction fee masking high-value fraud.",
    safeResponseGuide: "Check your parcel tracking number directly on indiapost.gov.in."
  }
];
