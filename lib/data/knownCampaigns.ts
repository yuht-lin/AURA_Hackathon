export interface KnownCampaign {
  id: string;
  name: string;
  cluster: string;
  firstSeen: string;
  indicators: string[];
  characteristicKeywords: string[];
  targetSector: string;
  modusOperandi: string;
  typicalNextMove: string;
}

export const KNOWN_SCAM_CAMPAIGNS: KnownCampaign[] = [
  {
    id: "CAMP-POWER-CUTOFF-2026",
    name: "Operation VoltTrap (Electricity Disconnection Smishing)",
    cluster: "Utility Extortion Syndicate",
    firstSeen: "2024-03-12 (Active Variants in 2026)",
    indicators: ["wb-electricity-bill-pay.cc", "apdcl-bill-update.xyz", "suvidha.apk", "quicksupport"],
    characteristicKeywords: ["electricity", "power", "disconnected", "tonight", "9:30 pm", "officer", "bill update", "বিদ্যুৎ", "বিজলী"],
    targetSector: "State Electricity Utility Consumers (APDCL, WBSEDCL, UPPCL)",
    modusOperandi: "Sends panic-inducing SMS late evening threatening immediate power cutoff. Directs victim to personal phone number or requests downloading remote access APKs.",
    typicalNextMove: "Instructs victim to install remote monitoring APK to intercept OTPs."
  },
  {
    id: "CAMP-BANK-KYC-SPOOF",
    name: "Operation PhishVault (Banking KYC Freeze Phishing)",
    cluster: "Banking Credential Harvester",
    firstSeen: "2023-08-19 (Active Wave)",
    indicators: ["sbi-kyc-verify-portal.xyz", "hdfc-netbanking-update.top", "onlinesbi-pan.cc"],
    characteristicKeywords: ["kyc", "pan card", "blocked", "account freeze", "verify kyc", "deactivated", "netbanking", "একাউণ্ট", "খাটা"],
    targetSector: "Retail Banking Customers (SBI, HDFC, PNB)",
    modusOperandi: "Claims immediate bank account lock due to unverified PAN/KYC. Prompts entry of username, password, MPIN, and live OTP on clone portals.",
    typicalNextMove: "Prompts victim for NetBanking password followed by live OTP interception."
  },
  {
    id: "CAMP-TASK-PIG-BUTCHER",
    name: "Operation MekongTask (YouTube/Telegram Part-Time Scam)",
    cluster: "Transnational Task Syndicate (SE Asia)",
    firstSeen: "2023-01-10 (Global)",
    indicators: ["t.me/quick_cash_india_job", "t.me/vip_task_manager", "earn-daily-bonus.vip"],
    characteristicKeywords: ["part time", "youtube", "like videos", "earn 3000", "daily income", "telegram", "bonus 500", "টকা উপার্জন", "কাম"],
    targetSector: "Job Seekers, Students, Home Workers",
    modusOperandi: "Offers high pay for trivial tasks. Credits small ₹150 payouts initially, then requires 'liquidity recharge deposits' into mule accounts.",
    typicalNextMove: "Demands tiered advance deposits to 'unlock' frozen accumulated earnings."
  },
  {
    id: "CAMP-POST-SMISH",
    name: "Operation PostBait (Postal Redelivery Fee Phishing)",
    cluster: "Logistics Card Harvester",
    firstSeen: "2024-06-01 (Active Wave)",
    indicators: ["ind-post-redelivery.top", "india-post-track.cc", "parcel-reschedule.xyz"],
    characteristicKeywords: ["india post", "parcel", "package", "address wrong", "redelivery", "rs 15", "ডেলিভাৰী", "পাৰ্চেল"],
    targetSector: "E-Commerce & Postal Consumers",
    modusOperandi: "Claims package held at sorting hub due to incorrect street number. Collects ₹15–₹25 fee while harvesting full card numbers, CVVs, and expiry dates.",
    typicalNextMove: "Charges fraudulent international card transactions using harvested credentials."
  },
  {
    id: "CAMP-UPI-CASHBACK-EXPLOIT",
    name: "Operation ReverseDebit (UPI Scratch Card Exploitation)",
    cluster: "UPI Intent Hijacker",
    firstSeen: "2022-11-15 (Active)",
    indicators: ["claim-phonepe-reward.top", "gpay-scratch-cashback.xyz"],
    characteristicKeywords: ["cashback", "won", "scratch card", "phonepe", "gpay", "enter upi pin", "reward 2999", "পুৰস্কাৰ"],
    targetSector: "Mobile Payment App Users",
    modusOperandi: "Dangles unsolicited ₹2,000–₹5,000 cash rewards. Triggers a UPI collect request tricking the user into entering their secret UPI PIN.",
    typicalNextMove: "Directs victim to input secret UPI PIN, initiating a direct debit from their account."
  }
];
