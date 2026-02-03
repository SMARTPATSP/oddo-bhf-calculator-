const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let funds = [
    { fundId: 'fund-001', name: 'ODDO BHF Sécurité Infra Euro', isin: 'SCUR001', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], esg: 'Article 6', ytdPerformance: 2.45, oneYearPerformance: 3.20, fees: 0.75, aum: 450000000, allocation: 0.25 },
    { fundId: 'fund-002', name: 'ODDO BHF Sécurité en euros', isin: 'SCEUR002', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], esg: 'Article 6', ytdPerformance: 2.80, oneYearPerformance: 3.50, fees: 0.75, aum: 520000000, allocation: 0.20 },
    { fundId: 'fund-003', name: 'ODDO BHF Euro Credit Short Duration', isin: 'LU0628638974', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], esg: 'Article 6', ytdPerformance: 3.60, oneYearPerformance: 4.20, fees: 0.80, aum: 851000000, allocation: 0.25 },
    { fundId: 'fund-005', name: 'ODDO BHF Métropole Euro', isin: 'FR0010632364', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], esg: 'Article 8', ytdPerformance: 23.70, oneYearPerformance: 15.90, fees: 1.50, aum: 114000000, allocation: 0.30 },
    { fundId: 'fund-006', name: 'ODDO BHF Avenir Europe', isin: 'FR0000974149', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], esg: 'Article 8', ytdPerformance: 10.10, oneYearPerformance: 7.70, fees: 2.00, aum: 1050000000, allocation: 0.25 },
    { fundId: 'fund-007', name: 'ODDO BHF Avenir Euro', isin: 'FR0000990095', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], esg: 'Article 8', ytdPerformance: 15.20, oneYearPerformance: 18.50, fees: 2.00, aum: 224000000, allocation: 0.25 },
    { fundId: 'fund-011', name: 'ODDO BHF Artificial Intelligence', isin: 'LU1919842267', riskLevel: 'High', assetClass: 'Equity', geography: ['Global'], esg: 'Article 6', ytdPerformance: 3.90, oneYearPerformance: 22.30, fees: 1.60, aum: 1030000000, allocation: 0.30 },
    { fundId: 'fund-012', name: 'ODDO BHF Algo Trend US', isin: 'LU1833929729', riskLevel: 'High', assetClass: 'Equity', geography: ['USA'], esg: 'Article 6', ytdPerformance: 5.70, oneYearPerformance: 20.90, fees: 1.20, aum: 395000000, allocation: 0.30 },
    { fundId: 'fund-015', name: 'ODDO BHF Polaris Moderate', isin: 'DE000A2JJ1W5', riskLevel: 'Low', assetClass: 'Diversified', geography: ['Global'], esg: 'Article 8', ytdPerformance: 5.40, oneYearPerformance: 6.30, fees: 1.10, aum: 1511000000, allocation: 0.25 },
    { fundId: 'fund-016', name: 'ODDO BHF Polaris Balanced', isin: 'LU1849527939', riskLevel: 'Medium', assetClass: 'Diversified', geography: ['Global'], esg: 'Article 8', ytdPerformance: 8.90, oneYearPerformance: 11.35, fees: 1.25, aum: 1116000000, allocation: 0.30 },
    { fundId: 'fund-017', name: 'ODDO BHF Polaris Dynamic', isin: 'LU1849528234', riskLevel: 'High', assetClass: 'Diversified', geography: ['Global'], esg: 'Article 8', ytdPerformance: 12.40, oneYearPerformance: 16.80, fees: 1.50, aum: 879000000, allocation: 0.35 }
];

let contracts = [
    { contractId: 'fipavie-ingenierie', name: 'Fipavie Ingénierie', minimumInvestment: 10000, funds: { secure: ['fund-001', 'fund-003', 'fund-007', 'fund-015'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-007', 'fund-015'], dynamic: ['fund-003', 'fund-005', 'fund-007', 'fund-011', 'fund-017'] } },
    { contractId: 'fipavie-opportunites', name: 'Fipavie Opportunités', minimumInvestment: 1500, funds: { secure: ['fund-002', 'fund-003', 'fund-015'], moderate: ['fund-002', 'fund-003', 'fund-005', 'fund-007', 'fund-016'], dynamic: ['fund-003', 'fund-005', 'fund-007', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'fipavie-expertises', name: 'Fipavie Expertises', minimumInvestment: 15000, funds: { secure: ['fund-001', 'fund-002', 'fund-003', 'fund-015'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-016'], dynamic: ['fund-003', 'fund-005', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'per-opportunites', name: 'PER Opportunités', minimumInvestment: 1000, funds: { secure: ['fund-001', 'fund-003', 'fund-015'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-016'], dynamic: ['fund-003', 'fund-005', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'premavenir-per', name: 'Premavenir PER', minimumInvestment: 500, funds: { secure: ['fund-002', 'fund-003', 'fund-015'], moderate: ['fund-002', 'fund-003', 'fund-005', 'fund-016'], dynamic: ['fund-005', 'fund-011', 'fund-012', 'fund-017'] } }
];

let portfolios = [];

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.get('/api/funds', (req, res) => res.json(funds));
app.get('/api/contracts', (req, res) => res.json(contracts));
app.get('/api/portfolios', (req, res) => res.json(portfolios));

app.post('/api/portfolios', (req, res) => {
    const portfolio = { portfolioId: `PF-${Date.now()}`, ...req.body, createdAt: new Date() };
    portfolios.push(portfolio);
    res.status(201).json(portfolio);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
