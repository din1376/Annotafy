# Annotafy

**Crowdsourced Data Campaigns & Annotation Platform**

---

## ✨ Feature-by-Feature Explanation

### 1. Campaign Creation
- **Create a new campaign** by specifying:
  - Title, description, and instructions (prompt)
  - Data type (image, text, etc.) and annotation type (label, bbox, text)
  - Rewards per upload/annotation and dataset price (with a minimum fee to prevent spam)

### 2. Campaign Discovery
- **Active Campaigns page** shows all campaigns as clickable cards
- **Cards use black/blue text for visibility**
- Click any card to see campaign details, uploads, and annotation tasks

### 3. Data Uploads
- **Upload images or text** to any campaign
- All uploads are shown under each campaign with filename and status

### 4. Annotation Workflow
- **Add annotations** to any upload (label, bounding box, or text, depending on campaign)
- Annotation input is interactive and instant
- All annotations are listed below each upload, showing annotator and content

### 5. Rewards & Redemption
- **USDFC rewards** for uploads and annotations
- **My Rewards page:**
  - Shows annotation count, earnings, and a reward redemption button
  - All data is interactive and updates instantly

### 6. Badges & Achievements
- Unlock badges for annotation milestones (e.g., 10, 50, 100, 200 annotations)
- Progress bar shows how close you are to the next badge
- All badges are visually displayed

### 7. Leaderboard
- See top contributors by annotation count and rewards earned
- Your rank is highlighted
- Leaderboard updates as you annotate more

### 8. Analytics (for future)
- Campaign cards and detail pages can show stats:
  - Number of uploads, annotations, total rewards distributed
- Architecture is ready for more analytics widgets and charts

### 9. UI/UX Philosophy
- **Modern, accessible design:**
  - White card backgrounds, blue/black text for contrast
  - Consistent card layout and section headings
  - Responsive and mobile-friendly
- **Ready for Filecoin/Synapse SDK integration for production**

---

## 🛠️ How Annotafy Uses Filecoin, Synapse SDK, and Filecoin Pay

### Filecoin: Decentralized Storage
- **All campaign metadata, uploads, and annotations are designed to be stored on Filecoin.**
  - This ensures that data is permanent, censorship-resistant, and verifiable.
  - Each file is referenced by a PieceCID (content identifier).

### Synapse SDK: Storage, Payments, and Data Management
- Annotafy integrates (or is ready to integrate) the [Synapse SDK](https://github.com/FilOzone/synapse-sdk) for:
  - **Uploading files to Filecoin:**
    - Campaigns, uploads, and annotation data are uploaded using Synapse's easy-to-use storage API.
  - **Querying and downloading data:**
    - All campaign and annotation data can be retrieved by PieceCID.
  - **Managing rewards and payments:**
    - Contributors are rewarded in USDFC, a stablecoin on Filecoin, for uploads and annotations.
    - Synapse SDK provides hooks and utilities for balance checks, payments, and reward distribution.

### Filecoin Pay (USDFC)
- **USDFC** is used as the main currency for rewards and payments.
  - Campaign creators fund campaigns with USDFC.
  - Annotators and uploaders earn USDFC for their contributions.
  - Filecoin Pay and Synapse handle the secure transfer and accounting of these rewards.

### Technical Stack
- **Next.js (App Router):** Modern React framework for UI and routing.
- **Tailwind CSS:** Consistent, rapid UI development.
- **TypeScript:** Type-safe development for reliability.
- **Modular Hooks:** Easy integration of Synapse SDK for storage and payments.

### Future-Ready
- Annotafy is architected for easy migration from local/demo data to full decentralized storage and real on-chain rewards.
- All core workflows are compatible with Filecoin and Synapse SDK APIs.

---

## Vision

Annotafy is a next-generation, open platform for collaborative data collection and annotation. It empowers anyone to:
- Launch data campaigns (e.g., image labeling, text transcription, bounding boxes)
- Crowdsource uploads and annotations from a global community
- Reward contributors with tokens
- Build high-quality, open datasets for AI, research, and industry
- Depositing funds to Synapse contracts using USDFC token.
- Uploading files to Filecoin through Synapse

## Prerequisites

- Node.js 18+ and npm
- A web3 wallet (like MetaMask)
- Basic understanding of React and TypeScript
- Get some tFIL tokens on Filecoin Calibration testnet [link to faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html)
- Get some USDFC tokens on Filecoin Calibration testnet [link to faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc)

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/yourusername/annotafy
cd fs-upload-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dApp.

## Key Components

### Wallet Connection
The dApp uses RainbowKit for seamless wallet connection, configured specifically for Filecoin networks:
- Filecoin Mainnet
- Filecoin Calibration (testnet)

### Query token and storage usage Balances
Shows how to:
- Get user FIL-USDFC-SynapseStorageUsage balances
- hook used to query user balances [link](https://github.com/din1376/Annotafy/blob/main/hooks/useBalances.ts)

### Pay For Storage with USDFC
Demonstrates how to:
- Pay for storage by depositing funds to Synapse contracts using USDFC token
- Handles one time payment for 10GB usage that persists 30days
- Notifies repayment if less than 10days remain for paying synapse based on current usage
- hook used to conduct a payment [link](https://github.com/din1376/Annotafy/blob/main/hooks/usePayment.ts)

### File Upload
Shows how to:
- Create a user-friendly file upload interface
- Upload file to Filecoin using synapse-sdk
- Monitor upload status
- Download filecoin from Filecoin using synapse-sdk
- hook used to upload a file [link](https://github.com/din1376/Annotafy/blob/main/hooks/useFileUpload.ts)

## Learn More

- [Filecoin synapse-sdk](https://github.com/FilOzone/synapse-sdk)
- [USDFC Token Documentation](https://docs.secured.finance/usdfc-stablecoin/getting-started)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- Best practices in React!
  - [Tanstack Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
  - [Tanstack Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
