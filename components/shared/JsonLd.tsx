export default function JsonLd({ salaryData }: { salaryData: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `Software Engineer Salaries at ${salaryData.companyName}`,
    "description": `Verified salary data for ${salaryData.role} at ${salaryData.companyName}.`,
    "variableMeasured": "Total Compensation",
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": typeof window !== 'undefined' ? window.location.href : ""
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}