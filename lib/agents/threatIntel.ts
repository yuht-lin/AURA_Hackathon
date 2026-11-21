import { ExtractedIndicators } from "../types/agent";

export function queryThreatIntelligence(indicators: ExtractedIndicators) {
  const domain = indicators.domains[0] || (indicators.urls[0] ? new URL(indicators.urls[0].startsWith("http") ? indicators.urls[0] : `http://${indicators.urls[0]}`).hostname : "unspecified-host.net");
  const isDangerousTld = domain.endsWith(".xyz") || domain.endsWith(".top") || domain.endsWith(".cc") || domain.endsWith(".ru");

  // Geolocation and ASN simulation based on domain characteristics
  let city = "Sofia";
  let country = "Bulgaria";
  let lat = 42.6977;
  let lng = 23.3219;
  let ipAddress = "185.220.101.42";
  let asn = "AS4837 (CHINA169-BACKBONE / Bulletproof Proxy Node)";
  let reputation = isDangerousTld ? "FLAGGED: Known Phishing Infrastructure (14/82 Feeds)" : "UNVERIFIED: Zero Historical Trust Telemetry";
  let ipThreatScore = isDangerousTld ? "HIGH (88/100)" : "LOW (15/100)";

  if (domain.includes("wb-electricity") || domain.includes("bill-pay")) {
    city = "Moscow";
    country = "Russia";
    lat = 55.7558;
    lng = 37.6173;
    ipAddress = "194.26.29.118";
    asn = "AS209605 (HostRoyale Bulletproof Proxy)";
    reputation = "CRITICAL: Active Trojan/Smishing Drop Site";
    ipThreatScore = "CRITICAL (96/100)";
  } else if (domain.includes("telegram") || domain.includes("t.me") || domain.includes("job")) {
    city = "Phnom Penh";
    country = "Cambodia";
    lat = 11.5564;
    lng = 104.9282;
    ipAddress = "103.145.13.88";
    asn = "AS139007 (Mekong Cybernet Mekong Delta)";
    reputation = "HIGH-RISK: Associated with Task Pig-Butchering Call Compounds";
    ipThreatScore = "HIGH (91/100)";
  } else if (domain.includes("post") || domain.includes("parcel")) {
    city = "Shenzhen";
    country = "China";
    lat = 22.5431;
    lng = 114.0579;
    ipAddress = "45.154.255.67";
    asn = "AS51852 (Private Layer Safehaven)";
    reputation = "CRITICAL: Automated Logistics Card-Harvesting Cluster";
    ipThreatScore = "CRITICAL (93/100)";
  }

  return {
    domainReputation: reputation,
    ipThreatScore,
    asnInfo: asn,
    dataSource: "SIMULATED_DEMO_INTELLIGENCE" as const,
    infrastructureLocation: {
      city,
      country,
      latitude: lat,
      longitude: lng,
      disclaimer: "CYBERSECURITY ATTRIBUTION DISCLAIMER: Geolocation data identifies the physical server, relay proxy, or cloud hosting infrastructure associated with the domain/IP; it does NOT represent the physical location or legal jurisdiction of the human perpetrator.",
    },
  };
}
