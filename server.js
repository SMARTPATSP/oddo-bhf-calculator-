const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let funds = [
    { fundId: 'fund-001', name: 'ODDO BHF Sécurité Infra Euro', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], allocation: 0.15 },
    { fundId: 'fund-002', name: 'ODDO BHF Sécurité en euros', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], allocation: 0.15 },
    { fundId: 'fund-003', name: 'ODDO BHF Euro Credit Short Duration', riskLevel: 'Low', assetClass: 'Fixed Income', geography: ['Europe'], allocation: 0.15 },
    { fundId: 'fund-004', name: 'ODDO BHF Global Target 2031', riskLevel: 'Medium', assetClass: 'Fixed Income', geography: ['Global'], allocation: 0.15 },
    { fundId: 'fund-005', name: 'ODDO BHF Métropole Euro', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], allocation: 0.20 },
    { fundId: 'fund-006', name: 'ODDO BHF Avenir Europe', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], allocation: 0.15 },
    { fundId: 'fund-007', name: 'ODDO BHF Avenir Euro', riskLevel: 'Medium', assetClass: 'Equity', geography: ['Europe'], allocation: 0.15 },
    { fundId: 'fund-011', name: 'ODDO BHF Artificial Intelligence', riskLevel: 'High', assetClass: 'Equity', geography: ['Global'], allocation: 0.20 },
    { fundId: 'fund-012', name: 'ODDO BHF Algo Trend US', riskLevel: 'High', assetClass: 'Equity', geography: ['USA'], allocation: 0.20 },
    { fundId: 'fund-015', name: 'ODDO BHF Polaris Moderate', riskLevel: 'Low', assetClass: 'Diversified', geography: ['Global'], allocation: 0.15 },
    { fundId: 'fund-016', name: 'ODDO BHF Polaris Balanced', riskLevel: 'Medium', assetClass: 'Diversified', geography: ['Global'], allocation: 0.18 },
    { fundId: 'fund-017', name: 'ODDO BHF Polaris Dynamic', riskLevel: 'High', assetClass: 'Diversified', geography: ['Global'], allocation: 0.20 }
];

let contracts = [
    { contractId: 'fipavie-ingenierie', name: 'Fipavie Ingénierie', minimumInvestment: 10000, funds: { secure: ['fund-001', 'fund-003', 'fund-007', 'fund-015', 'fund-002'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-007', 'fund-015', 'fund-016'], dynamic: ['fund-003', 'fund-005', 'fund-007', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'fipavie-opportunites', name: 'Fipavie Opportunités', minimumInvestment: 1500, funds: { secure: ['fund-002', 'fund-003', 'fund-015', 'fund-001', 'fund-004'], moderate: ['fund-002', 'fund-003', 'fund-005', 'fund-007', 'fund-016', 'fund-015'], dynamic: ['fund-003', 'fund-005', 'fund-007', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'fipavie-expertises', name: 'Fipavie Expertises', minimumInvestment: 15000, funds: { secure: ['fund-001', 'fund-002', 'fund-003', 'fund-015', 'fund-004'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-016', 'fund-015'], dynamic: ['fund-003', 'fund-005', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'per-opportunites', name: 'PER Opportunités', minimumInvestment: 1000, funds: { secure: ['fund-001', 'fund-003', 'fund-015', 'fund-002'], moderate: ['fund-001', 'fund-003', 'fund-005', 'fund-016', 'fund-015'], dynamic: ['fund-003', 'fund-005', 'fund-011', 'fund-012', 'fund-017'] } },
    { contractId: 'premavenir-per', name: 'Premavenir PER', minimumInvestment: 500, funds: { secure: ['fund-002', 'fund-003', 'fund-015'], moderate: ['fund-002', 'fund-003', 'fund-005', 'fund-016'], dynamic: ['fund-005', 'fund-011', 'fund-012', 'fund-017'] } }
];

let portfolios = [];

app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));
app.get('/api/funds', (req, res) => res.json(funds));
app.get('/api/contracts', (req, res) => res.json(contracts));
app.get('/api/portfolios', (req, res) => res.json(portfolios));

app.post('/api/portfolios', (req, res) => {
    const portfolio = { 
        portfolioId: `PF-${Date.now()}`, 
        ...req.body, 
        createdAt: new Date(),
        status: 'active'
    };
    portfolios.push(portfolio);
    res.status(201).json(portfolio);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
