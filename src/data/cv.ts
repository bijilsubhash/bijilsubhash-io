/**
 * CV data — source for /cv (design.md §5, §7). Public contact is work email
 * only; phone and personal email are intentionally omitted.
 * See docs/adr and the grill session that produced this page.
 */

export type Experience = {
  role: string
  employer: string
  location: string
  dates: string
  bullets: string[]
}

export type Education = {
  degree: string
  school: string
  dates: string
}

export type SkillGroup = {
  group: string
  items: string
}

export type CertGroup = {
  issuer: string
  items: { name: string; year: string }[]
}

export const cv = {
  name: 'Bijil Subhash',
  headline: 'Data engineer · Sydney',
  email: 'bijil@nimblestax.com',
  summary:
    'Forward deployed data engineer with 5+ years building modern data platforms — scalable, reliable, and maintainable. Track record across batch and streaming ingestion, data modelling and transformation, governance, analytics, infrastructure as code, and DataOps, with a focus on measurable business outcomes and enabling AI adoption.',

  experience: [
    {
      role: 'Forward Deployed Data Engineer',
      employer: 'Beyond Data Consulting',
      location: 'Sydney, Australia',
      dates: 'Nov 2025 – Present',
      bullets: [
        'Grew a key strategic account to $2M AUD in 8 months, embedded client-side to architect, build, and productionise end-to-end solutions on a native GCP stack (BigQuery, Cloud Storage, Cloud Run) while shaping the account roadmap.',
        'Lead the enterprise data platform build for a geopolitical risk advisory firm — state-aware batch and streaming ingestion, an asset-driven orchestration layer, and a modular transformation framework with end-to-end monitoring and alerting.',
        'Designed and built a state-driven micro-payments platform for advisor remuneration, retiring a 15-year-old manual process, removing a compliance exposure, and saving 100+ hours annually.',
        'Implemented event-driven integrations combining a Pub/Sub queue and webhook listeners for real-time propagation with Dagster-orchestrated batch reconciliation to catch drift.',
        'Designed the streaming ingestion architecture behind a business-critical AI product, and a near-real-time pipeline transforming live CMS updates into RAG-ready output.',
        'Led a 6-week migration from Salesforce to monday.com, redesigning the CRM object model to modelling best practice and phasing the cutover to a single source of truth.',
        'Partnered with C-suite, GTM, and analyst stakeholders to define OKR metrics, saving 200+ hours annually and surfacing $500k+/year in uncaptured revenue.',
      ],
    },
    {
      role: 'Partner Instructor & Data Engineer',
      employer: 'Breakout Labs',
      location: 'Sydney, Australia',
      dates: 'Jan 2026 – Present',
      bullets: [
        'Delivered multi-day Snowflake and dbt training to 100+ engineers and analytics practitioners, running hands-on labs for enterprise cohorts of up to 25.',
        'Took teams from fundamentals to production practice: incremental models, snapshots, macros, testing, CI/CD, query optimisation, and advanced SQL.',
        'Spearheaded the AI engineering curriculum, teaching teams to build pipelines and semantic models using Claude Code, Snowflake Cortex, dbt Wizard, agent harnesses, and MCP.',
        'Built the IaC framework provisioning training environments end to end — dbt Cloud accounts and projects alongside Snowflake schemas, roles, and compute via Terraform.',
      ],
    },
    {
      role: 'Founding Data Engineer',
      employer: 'NimbleStax',
      location: 'Sydney, Australia',
      dates: 'Nov 2023 – Present',
      bullets: [
        'Developed a config-driven Python ingestion framework covering 150+ API endpoints with dlt, cutting ingestion costs by ~95% and migrating a client off low/no-code tooling.',
        'Migrated a client from unorchestrated AWS Lambda pipelines to a governed, modular platform on MotherDuck, Dagster, and dbt, establishing observability and deployment practice from day one.',
        'Built an end-to-end platform on MotherDuck and DuckDB for a seed-stage startup — ingestion (dlt), transformation (dbt), orchestration, and infrastructure (Terraform) on GCP.',
        'Built an Azure Databricks platform applying modelling, transformation, DataOps, and IaC across Python, dbt, and Terraform to migrate a client off Snowflake.',
        'Designed a Unity Catalog–enabled Databricks architecture entirely through IaC, managing 3 workspaces from a central config-driven Terraform framework.',
        'Delivered LLM and analytics workloads on GCP (BigQuery, Cloud Run, Cloud Functions, Looker Studio) for a mid-tier organisation.',
      ],
    },
    {
      role: 'Data Engineer',
      employer: 'National Renewable Network',
      location: 'Sydney, Australia',
      dates: 'Aug 2025 – Jan 2026',
      bullets: [
        'Founding data engineer at a Series A startup, owning the entire platform end to end — ingestion, transformation, orchestration, analytics, and governance — built from scratch.',
        'Designed an event-driven architecture on GCP (Pub/Sub, Cloud Run, Cloud SQL, BigQuery) ingesting ~300M rows daily to power a virtual power plant monitoring distributed renewable assets in real time.',
        'Built a production Python ingestion framework for time-series telemetry from residential IoT devices and CRM data via REST APIs.',
        'Deployed a hybrid Dagster instance as the single orchestration layer, using declarative automation, asset checks, and factory patterns.',
        'Established the dbt project and modelling standards, applying software engineering practice to analytics transformation.',
        'Rolled out Terraform IaC patterns, CI/CD for platform deployments, and a test suite covering core service functionality.',
      ],
    },
    {
      role: 'Associate → Senior Data Engineer',
      employer: 'Mantel Group',
      location: 'Sydney, Australia',
      dates: 'Jan 2023 – Aug 2025',
      bullets: [
        'Developed a Kubernetes operator framework surfacing real-time data product status for one of Australia’s Big 4 banks, a core component of their enterprise data mesh (GKE, Pub/Sub, Cloud Run, Python, Terraform, Docker).',
        'Blueprinted the migration of legacy AWS Databricks workspaces to Unity Catalog for Australia’s largest energy retailer, building config-driven Terraform patterns and reusable Azure DevOps pipelines.',
        'Contributed 800+ dbt models on a national retail chain’s Teradata-to-BigQuery migration, applying the analytics engineering lifecycle at enterprise scale.',
        'Built a consolidated data model for a vulnerability management solution using dbt and Cloud Composer, merging 3 sources (~2B rows) for organisation-wide risk assessment.',
        'Implemented a GenAI architecture on Vertex AI, dbt, and Cloud Composer, turning ~20,000 free-text survey responses into structured insight for leadership.',
        'Designed executive dashboards for delivery metrics in Looker and Looker Studio, saving operational leadership 20+ hours weekly.',
      ],
    },
  ] satisfies Experience[],

  skills: [
    { group: 'Platforms', items: 'Databricks, Snowflake, BigQuery, MotherDuck / DuckDB, GCP, Azure, AWS' },
    { group: 'Ingestion', items: 'dlt, Fivetran, Polytomic, Pub/Sub, custom Python frameworks, CDC & streaming' },
    { group: 'Transformation', items: 'dbt, PySpark, Spark SQL, dimensional modelling, semantic layer' },
    { group: 'Orchestration', items: 'Dagster, Airflow' },
    { group: 'Infra & DataOps', items: 'Terraform, Docker, Kubernetes (GKE), CI/CD (GitHub, GitLab, Azure DevOps, Cloud Build), Pytest' },
    { group: 'AI & Analytics', items: 'Vertex AI, Snowflake Cortex, Claude Code, MCP, RAG, Looker, Looker Studio, Power BI, Omni' },
    { group: 'Governance', items: 'Unity Catalog, Cloud IAM' },
    { group: 'Languages', items: 'Python, SQL' },
  ] satisfies SkillGroup[],

  education: [
    { degree: 'PhD, Chemical Engineering', school: 'University of New South Wales', dates: '2019 – 2023' },
    { degree: 'Bachelor of Chemical Engineering', school: 'University of New South Wales', dates: '2015 – 2019' },
  ] satisfies Education[],

  certifications: [
    {
      issuer: 'Databricks',
      items: [
        { name: 'Professional Data Engineer', year: '2024' },
        { name: 'Associate Machine Learning Engineer', year: '2024' },
        { name: 'Associate Data Engineer', year: '2024' },
      ],
    },
    {
      issuer: 'Google Cloud',
      items: [
        { name: 'Professional Data Engineer', year: '2023' },
        { name: 'Associate Cloud Engineer', year: '2024' },
      ],
    },
    {
      issuer: 'dbt Labs',
      items: [
        { name: 'Cloud Architect', year: '2026' },
        { name: 'Certified Developer', year: '2024' },
      ],
    },
    { issuer: 'Microsoft Azure', items: [{ name: 'Associate Data Engineer', year: '2024' }] },
    { issuer: 'HashiCorp', items: [{ name: 'Terraform Associate', year: '2023' }] },
    { issuer: 'dlt', items: [{ name: 'Advanced ELT Specialist', year: '2024' }] },
    { issuer: 'Neo4j', items: [{ name: 'Certified Professional', year: '2024' }] },
  ] satisfies CertGroup[],
} as const
