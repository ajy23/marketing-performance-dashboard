import React, { useState, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const financeCSV = `Month,Marketing_Budget,Actual_Spend,Total_Revenue,Gross_Margin
2025-10-01,85000,81500,250000,105000
2025-09-01,75000,68000,180000,65000
2025-08-01,95000,102000,290000,140000
2025-07-01,65000,58000,165000,60000
2025-06-01,80000,88000,260000,115000
2025-05-01,100000,115000,300000,150000
2025-04-01,55000,45000,155000,55000
2025-03-01,90000,95000,280000,130000
2025-02-01,60000,52000,170000,65000
2025-01-01,88000,92000,275000,125000
2024-12-01,78000,75000,220000,95000
2024-11-01,52000,42000,150000,50000
2024-10-01,98000,110000,295000,145000
2024-09-01,72000,65000,175000,62000
2024-08-01,92000,108000,298000,148000
2024-07-01,58000,48000,160000,58000
2024-06-01,83000,90000,265000,120000
2024-05-01,70000,62000,185000,68000
2024-04-01,50000,40000,152000,52000
2024-03-01,87000,98000,285000,135000
2024-02-01,75000,78000,230000,100000
2024-01-01,62000,55000,178000,68000
2023-12-01,95000,112000,292000,142000
2023-11-01,68000,60000,182000,66000
2023-10-01,99000,118000,300000,150000
2023-09-01,51000,41000,151000,51000
2023-08-01,85000,91000,270000,125000
2023-07-01,73000,66000,190000,70000
2023-06-01,57000,47000,158000,57000
2023-05-01,90000,105000,288000,138000
2023-04-01,64000,56000,172000,64000
2023-03-01,89000,100000,282000,132000
2023-02-01,77000,80000,240000,105000
2023-01-01,53000,43000,153000,53000
2022-12-01,97000,115000,296000,146000
2022-11-01,66000,59000,174000,63000
2022-10-01,88000,95000,275000,125000
2022-09-01,71000,64000,188000,69000
2022-08-01,94000,111000,294000,144000
2022-07-01,56000,46000,157000,56000
2022-06-01,91000,107000,290000,140000
2022-05-01,63000,55000,171000,63000
2022-04-01,86000,97000,278000,128000
2022-03-01,74000,77000,235000,103000
2022-02-01,54000,44000,154000,54000
2022-01-01,84000,93000,272000,122000
2021-12-01,67000,59000,179000,67000
2021-11-01,99000,118000,300000,150000
2021-10-01,59000,49000,162000,59000
2021-09-01,82000,89000,262000,117000
2021-08-01,69000,61000,184000,69000`;

const channelCSV = `Date,Channel,Impressions,Clicks,Conversions,Spend,Revenue,New_Customers,Returning_Customers
2025-10-01,Google,750890,15420,3800,45100,85900,1500,8500
2025-09-01,Meta,250120,4100,1250,12800,28500,400,3500
2025-08-01,TikTok,550340,10200,2500,28900,55100,900,6200
2025-07-01,Amazon,890560,18500,4500,49500,98000,1900,9800
2025-06-01,Google,380780,7200,1800,19200,38700,650,4800
2025-05-01,Meta,910990,19800,4900,48000,95500,1950,9500
2025-04-01,TikTok,180120,2800,750,8100,18900,250,2500
2025-03-01,Amazon,620340,12100,3100,35600,68300,1200,7100
2025-02-01,Google,290560,5100,1300,15400,30200,550,4100
2025-01-01,Meta,780780,16500,4200,40100,78800,1650,8200
2024-12-01,TikTok,450990,8800,2200,25500,49000,800,5500
2024-11-01,Amazon,150120,2100,550,6800,15500,150,2100
2024-10-01,Google,850340,17800,4400,47200,92100,1750,9100
2024-09-01,Meta,320560,6100,1600,17900,35500,600,4500
2024-08-01,TikTok,950780,19200,4800,49900,99500,1990,9900
2024-07-01,Amazon,220990,3800,950,10500,23400,350,3100
2024-06-01,Google,680120,13500,3400,37800,72900,1350,7800
2024-05-01,Meta,410340,7900,2000,22500,44500,750,5200
2024-04-01,TikTok,120560,1500,350,5500,12500,100,2000
2024-03-01,Amazon,720780,14800,3700,39500,78100,1450,8100
2024-02-01,Google,500990,9500,2400,27800,52800,850,5800
2024-01-01,Meta,200120,3500,850,9500,21200,300,2800
2023-12-01,TikTok,800340,16900,4300,45900,91500,1700,9200
2023-11-01,Amazon,350560,6800,1700,18500,37500,620,4700
2023-10-01,Google,980780,19900,4990,49800,99900,1999,9990
2023-09-01,Meta,110990,1200,250,5100,11500,60,2050
2023-08-01,TikTok,600120,11500,2900,32000,64500,1100,6800
2023-07-01,Amazon,480340,9000,2300,26500,50500,880,5600
2023-06-01,Google,170560,2600,650,7500,17900,200,2400
2023-05-01,Meta,880780,18100,4550,46500,92500,1800,9100
2023-04-01,TikTok,280990,4900,1200,14500,29800,450,3800
2023-03-01,Amazon,700120,14200,3600,38500,76500,1400,7900
2023-02-01,Google,550340,10500,2600,29500,58500,950,6500
2023-01-01,Meta,140560,1900,450,6100,13500,120,2000
2022-12-01,TikTok,900780,18800,4700,47900,95900,1850,9500
2022-11-01,Amazon,260990,4500,1100,11900,26500,420,3400
2022-10-01,Google,760120,15800,3900,42100,82500,1550,8700
2022-09-01,Meta,340340,6500,1700,18900,36900,630,4600
2 २०२२-08-01,TikTok,930560,19500,4950,49500,99000,1980,9950
2022-07-01,Amazon,160780,2400,600,7200,16500,180,2300
2022-06-01,Google,870990,18000,4500,47800,95100,1800,9400
2022-05-01,Meta,230120,4000,1000,11500,25000,380,3200
2022-04-01,TikTok,730340,14900,3700,40500,80500,1450,8100
2022-03-01,Amazon,420560,8200,2100,23800,47500,780,5400
2022-02-01,Google,130780,1700,400,5900,13000,90,2000
2022-01-01,Meta,830990,17100,4300,43500,86500,1700,8800
2021-12-01,TikTok,360120,6900,1750,19900,40100,680,4900
2021-11-01,Amazon,960340,19700,4900,49900,99500,1950,9900
2021-10-01,Google,190560,3200,800,8900,20500,280,2700
2021-09-01,Meta,650780,12800,3200,34500,69500,1250,7500
2021-08-01,TikTok,240990,4300,1100,12500,27500,410,3300`;

const parseCSV = (csvText) => {
    const correctedCsv = csvText.trim();
    const lines = correctedCsv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, i) => {
            const value = values[i];
            obj[header] = isNaN(Number(value)) || value.includes('-') ? value : Number(value);
        });
        return obj;
    });
};

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);
const formatPercentage = (value) => `${(value * 100).toFixed(1)}%`;
const formatRatio = (value) => `${value.toFixed(2)}`;

const FilterCheckbox: React.FC<{ label: any, value: any, checked: any, onChange: any }> = ({ label, value, checked, onChange }) => (
    <label className="filter-checkbox">
        <input type="checkbox" value={value} checked={checked} onChange={onChange} />
        <span>{label}</span>
    </label>
);

const Filters = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleGroupChange = (type, values, shouldSelect) => {
        const currentSelection = new Set(selected[type]);
        if (shouldSelect) {
            values.forEach(v => currentSelection.add(v));
        } else {
            values.forEach(v => currentSelection.delete(v));
        }
        onChange(type, Array.from(currentSelection));
    };
    
    return (
        <div className="filters-wrapper">
            <button onClick={() => setIsOpen(!isOpen)} className="filter-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                    <path d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.59L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" />
                </svg>
                <span>Filters</span>
            </button>
            <div className={`filters-container ${isOpen ? 'open' : ''}`}>
                {[
                    { title: 'Channels', type: 'channels', items: options.channels.map(c => ({ label: c, value: c })) },
                    { title: 'Years', type: 'years', items: options.years.map(y => ({ label: y, value: y })) },
                    { title: 'Quarters', type: 'quarters', items: options.quarters },
                    { title: 'Months', type: 'months', items: options.months }
                ].map(({ title, type, items }) => (
                    <div className="filter-group" key={type}>
                        <div className="filter-group-header">
                            <h4>{title}</h4>
                            <div className="filter-group-actions">
                                <button onClick={() => handleGroupChange(type, items.map(i => i.value), true)}>All</button>
                                <button onClick={() => handleGroupChange(type, items.map(i => i.value), false)}>None</button>
                            </div>
                        </div>
                        <div className="filter-options">
                            {items.map(item => (
                                <FilterCheckbox
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                    checked={selected[type]?.includes(item.value)}
                                    onChange={() => onChange(type, item.value)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Header = ({ view, setView, theme, toggleTheme }) => (
    <header className="app-header">
        <div className="logo-container">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="60" width="15" height="30" rx="3" fill="#4f46e5"/>
                <rect x="40" y="40" width="15" height="50" rx="3" fill="#6366f1"/>
                <rect x="65" y="20" width="15" height="70" rx="3" fill="#818cf8"/>
            </svg>
            <h1>Marketing Performance</h1>
        </div>
        <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                )}
            </button>
            <div className="toggle-switch">
                <button className={view === 'CMO' ? 'active' : ''} onClick={() => setView('CMO')}>CMO View</button>
                <button className={view === 'CFO' ? 'active' : ''} onClick={() => setView('CFO')}>CFO View</button>
            </div>
        </div>
    </header>
);

const Footer = () => (
    <footer className="app-footer">
        &copy; {new Date().getFullYear()} Marketing Performance Dashboard. All rights reserved.
    </footer>
);

const App = () => {
    const [view, setView] = useState('CMO');
    const [filters, setFilters] = useState(null);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const financeData = useMemo(() => parseCSV(financeCSV).sort((a, b) => new Date(a.Month).getTime() - new Date(b.Month).getTime()), []);
    const channelData = useMemo(() => parseCSV(channelCSV), []);

    const filterOptions = useMemo(() => {
        const allDates = [...new Set([...financeData.map(d => d.Month), ...channelData.map(d => d.Date)])];
        const years = [...new Set(allDates.map(d => d && new Date(d).getFullYear()).filter(y => !isNaN(y)))].sort((a, b) => b - a);
        const months = [
            { label: 'Jan', value: 1 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 },
            { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 6 },
            { label: 'Jul', value: 7 }, { label: 'Aug', value: 8 }, { label: 'Sep', value: 9 },
            { label: 'Oct', value: 10 }, { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 }
        ];
        const quarters = [{ label: 'Q1', value: 1 }, { label: 'Q2', value: 2 }, { label: 'Q3', value: 3 }, { label: 'Q4', value: 4 }];
        const channels = ['Google', 'Meta', 'TikTok', 'Amazon'];
        return { years, months, quarters, channels };
    }, [financeData, channelData]);

    useEffect(() => {
        if (filterOptions) {
            setFilters({
                channels: [...filterOptions.channels],
                years: [...filterOptions.years],
                months: filterOptions.months.map(m => m.value),
                quarters: filterOptions.quarters.map(q => q.value),
            });
        }
    }, [filterOptions]);

    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            const newValues = Array.isArray(value) ? value : [...(prev[type] || [])];
            if (!Array.isArray(value)) {
                const index = newValues.indexOf(value);
                if (index > -1) {
                    newValues.splice(index, 1);
                } else {
                    newValues.push(value);
                }
            }
            return { ...prev, [type]: newValues };
        });
    };
    
    const processedData = useMemo(() => {
        if (!filters) {
            const emptyTotals = { Impressions: 0, Clicks: 0, Conversions: 0, Spend: 0, Revenue: 0, New_Customers: 0, Returning_Customers: 0 };
             return { channels: [], channelTotals: [], overallTotals: emptyTotals, filteredFinanceData: [], financeTotals: { Marketing_Budget: 0, Actual_Spend: 0, Total_Revenue: 0, Gross_Margin: 0 } };
        }
    
        const getQuarter = (month: number) => Math.floor((Number(month) - 1) / 3) + 1;
    
        const filteredChannelData = channelData.filter(d => {
            if (!d.Date) return false;
            const date = new Date(d.Date);
            if (isNaN(date.getTime())) return false;
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const quarter = getQuarter(month);
    
            return filters.channels.includes(d.Channel) &&
                   filters.years.includes(year) &&
                   filters.months.includes(month) &&
                   filters.quarters.includes(quarter);
        });
    
        const filteredFinanceData = financeData.filter(d => {
            if (!d.Month) return false;
            const date = new Date(d.Month);
            if (isNaN(date.getTime())) return false;
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const quarter = getQuarter(month);
    
            return filters.years.includes(year) &&
                   filters.months.includes(month) &&
                   filters.quarters.includes(quarter);
        });

        const channels = filterOptions.channels;
        const channelTotals = channels.map(channel => {
            const data = filteredChannelData.filter(d => d.Channel === channel);
            return data.reduce((acc, row) => {
                acc.Impressions += row.Impressions;
                acc.Clicks += row.Clicks;
                acc.Conversions += row.Conversions;
                acc.Spend += row.Spend;
                acc.Revenue += row.Revenue;
                acc.New_Customers += row.New_Customers;
                acc.Returning_Customers += row.Returning_Customers;
                return acc;
            }, { channel, Impressions: 0, Clicks: 0, Conversions: 0, Spend: 0, Revenue: 0, New_Customers: 0, Returning_Customers: 0 });
        });

        const overallTotals = channelTotals.reduce((acc, ch) => {
            Object.keys(ch).forEach(key => {
                if (key !== 'channel') acc[key] = (acc[key] || 0) + ch[key];
            });
            return acc;
        }, { Impressions: 0, Clicks: 0, Conversions: 0, Spend: 0, Revenue: 0, New_Customers: 0, Returning_Customers: 0 });
        
        const financeTotals = filteredFinanceData.reduce((acc, row) => {
             acc.Marketing_Budget += row.Marketing_Budget;
             acc.Actual_Spend += row.Actual_Spend;
             acc.Total_Revenue += row.Total_Revenue;
             acc.Gross_Margin += row.Gross_Margin;
             return acc;
        }, { Marketing_Budget: 0, Actual_Spend: 0, Total_Revenue: 0, Gross_Margin: 0 });

        return { channels, channelTotals, overallTotals, filteredFinanceData, financeTotals };
    }, [financeData, channelData, filters, filterOptions]);

    const chartColors = {
        Google: 'rgba(52, 168, 83, 0.7)',
        Meta: 'rgba(66, 103, 178, 0.7)',
        TikTok: 'rgba(239, 68, 68, 0.7)',
        Amazon: 'rgba(255, 153, 0, 0.7)',
        NewCustomer: 'rgba(139, 92, 246, 0.7)',
        ReturningCustomer: 'rgba(249, 115, 22, 0.7)',
        Budget: 'rgba(75, 192, 192, 0.7)',
        Spend: 'rgba(255, 99, 132, 0.7)',
        Revenue: 'rgba(54, 162, 235, 0.7)',
        Margin: 'rgba(153, 102, 255, 0.7)',
    };

    return (
        <>
            <style>{`
                :root {
                    --bg-primary: #0f172a;
                    --bg-secondary: #1e293b;
                    --bg-tertiary: #334155;
                    --bg-hover: #334155;
                    --text-primary: #f8fafc;
                    --text-secondary: #94a3b8;
                    --text-tertiary: #64748b;
                    --border-color: #334155;
                    --border-hover: #475569;
                    --shadow: rgba(0,0,0,0.1);
                    --accent: #4f46e5;
                }
                .light {
                    --bg-primary: #ffffff;
                    --bg-secondary: #f8fafc;
                    --bg-tertiary: #e2e8f0;
                    --bg-hover: #e2e8f0;
                    --text-primary: #0f172a;
                    --text-secondary: #475569;
                    --text-tertiary: #64748b;
                    --border-color: #e2e8f0;
                    --border-hover: #cbd5e1;
                    --shadow: rgba(0,0,0,0.05);
                    --accent: #4f46e5;
                }
                * { box-sizing: border-box; }
                body { 
                    background-color: var(--bg-primary);
                    color: var(--text-primary); 
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                .app-main { padding: 2rem 1.5rem; flex-grow: 1; }
                .dashboard-container { max-width: 1400px; margin: auto; }
                .app-header { 
                    background-color: var(--bg-secondary);
                    padding: 1.25rem 2rem; 
                    border-bottom: 1px solid var(--border-color); 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    flex-wrap: wrap; 
                    gap: 1rem; 
                    transition: all 0.3s ease;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .logo-container { display: flex; align-items: center; gap: 0.875rem; }
                .logo-container h1 { 
                    font-size: 1.5rem; 
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0; 
                    transition: color 0.3s ease;
                }
                .app-footer { 
                    text-align: center; 
                    padding: 2rem 1.5rem; 
                    font-size: 0.875rem; 
                    color: var(--text-tertiary); 
                    background-color: var(--bg-primary);
                    margin-top: auto; 
                    transition: all 0.3s ease;
                }
                .header-controls { display: flex; align-items: center; gap: 1rem; }
                .theme-toggle { 
                    background-color: var(--bg-tertiary);
                    border: 1px solid var(--border-color); 
                    color: var(--text-secondary); 
                    padding: 0.625rem; 
                    border-radius: 0.5rem; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: all 0.2s ease;
                }
                .theme-toggle:hover { 
                    background-color: var(--accent);
                    color: #fff;
                }
                .toggle-switch { 
                    display: flex; 
                    background-color: var(--bg-tertiary);
                    border-radius: 999px; 
                    padding: 4px; 
                }
                .toggle-switch button { 
                    font-size: 0.875rem; 
                    font-weight: 600; 
                    padding: 0.625rem 1.5rem; 
                    border: none; 
                    background-color: transparent; 
                    color: var(--text-secondary); 
                    border-radius: 999px; 
                    cursor: pointer; 
                    transition: all 0.2s ease;
                }
                .toggle-switch button.active { 
                    background-color: var(--accent);
                    color: #fff;
                }
                .toggle-switch button:not(.active):hover {
                    color: var(--text-primary);
                }
                .kpi-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
                    gap: 1.5rem; 
                    margin-bottom: 2rem; 
                }
                .kpi-card { 
                    background-color: var(--bg-secondary);
                    padding: 1.5rem; 
                    border-radius: 0.75rem; 
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 2px 4px var(--shadow);
                }
                .kpi-card:hover { 
                    transform: translateY(-2px); 
                    box-shadow: 0 4px 12px var(--shadow);
                }
                .kpi-card h3 { 
                    margin: 0 0 0.5rem 0; 
                    font-size: 0.875rem; 
                    color: var(--text-secondary); 
                    font-weight: 500; 
                    transition: color 0.3s ease; 
                }
                .kpi-card p { 
                    margin: 0; 
                    font-size: 2.25rem; 
                    font-weight: 700; 
                    color: var(--text-primary); 
                    transition: color 0.3s ease;
                }
                .chart-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
                    gap: 1.5rem; 
                }
                .chart-card { 
                    background-color: var(--bg-secondary);
                    padding: 1.5rem; 
                    border-radius: 0.75rem; 
                    transition: all 0.2s ease;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 2px 4px var(--shadow);
                }
                .chart-card:hover { 
                    transform: translateY(-2px); 
                    box-shadow: 0 4px 12px var(--shadow);
                }
                .chart-card h3 { 
                    margin: 0 0 1.5rem 0; 
                    font-size: 1.25rem; 
                    font-weight: 600; 
                    color: var(--text-primary); 
                    transition: color 0.3s ease;
                }
                .no-data { 
                    text-align: center; 
                    padding: 3rem 2rem; 
                    color: var(--text-secondary); 
                    font-size: 1.125rem; 
                    grid-column: 1 / -1;
                }
                .filters-wrapper { margin-bottom: 2rem; }
                .filter-toggle { 
                    display: flex; 
                    align-items: center; 
                    gap: 0.5rem; 
                    background-color: var(--bg-secondary);
                    color: var(--text-secondary); 
                    border: 1px solid var(--border-color); 
                    padding: 0.75rem 1.25rem; 
                    border-radius: 0.5rem; 
                    font-size: 0.875rem; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.2s ease;
                }
                .filter-toggle:hover { 
                    background-color: var(--accent);
                    color: #fff;
                }
                .filters-container { 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 1.5rem; 
                    background-color: var(--bg-secondary);
                    border-radius: 0.75rem; 
                    max-height: 0; 
                    overflow: hidden; 
                    padding: 0 1.5rem; 
                    margin-top: 0; 
                    opacity: 0; 
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
                    border: 1px solid transparent;
                }
                .filters-container.open { 
                    max-height: 600px; 
                    padding: 1.5rem; 
                    margin-top: 1rem; 
                    opacity: 1; 
                    border-color: var(--border-color);
                }
                .filter-group { flex: 1 1 200px; }
                .filter-group-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 0.75rem; 
                }
                .filter-group h4 { 
                    margin: 0; 
                    font-size: 1rem; 
                    font-weight: 600;
                    color: var(--text-primary); 
                    transition: color 0.3s ease;
                }
                .filter-group-actions button { 
                    background: none; 
                    border: none; 
                    color: var(--text-tertiary); 
                    font-size: 0.75rem; 
                    font-weight: 600;
                    cursor: pointer; 
                    padding: 0.25rem 0.5rem; 
                    border-radius: 0.25rem;
                    transition: all 0.2s ease;
                }
                .filter-group-actions button:hover { 
                    color: var(--accent);
                    background-color: var(--bg-tertiary);
                }
                .filter-options { 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 0.75rem; 
                    max-height: 150px; 
                    overflow-y: auto; 
                    padding-right: 0.5rem;
                }
                .filter-checkbox { 
                    display: flex; 
                    align-items: center; 
                    cursor: pointer; 
                    font-size: 0.875rem; 
                    color: var(--text-secondary); 
                    transition: color 0.2s ease;
                }
                .filter-checkbox:hover {
                    color: var(--text-primary);
                }
                .filter-checkbox input { display: none; }
                .filter-checkbox span { position: relative; padding-left: 24px; }
                .filter-checkbox span::before { 
                    content: ''; 
                    position: absolute; 
                    left: 0; 
                    top: 2px; 
                    width: 16px; 
                    height: 16px; 
                    background-color: var(--bg-tertiary); 
                    border: 1px solid var(--border-hover); 
                    border-radius: 4px; 
                    transition: all 0.2s ease;
                }
                .filter-checkbox input:checked + span::before { 
                    background-color: var(--accent);
                    border-color: var(--accent);
                }
                .filter-checkbox span::after { 
                    content: '✓'; 
                    position: absolute; 
                    left: 3px; 
                    top: 1px; 
                    color: #fff; 
                    font-weight: 600;
                    font-size: 12px;
                    opacity: 0; 
                    transition: opacity 0.2s ease;
                }
                .filter-checkbox input:checked + span::after { opacity: 1; }
            `}</style>
            <Header view={view} setView={setView} theme={theme} toggleTheme={toggleTheme} />
            <main className="app-main">
                <div className="dashboard-container">
                    {filters && <Filters options={filterOptions} selected={filters} onChange={handleFilterChange} />}
                    {view === 'CMO' ? <CMODashboard data={processedData} colors={chartColors} theme={theme} /> : <CFODashboard data={processedData} colors={chartColors} theme={theme} />}
                </div>
            </main>
            <Footer />
        </>
    );
};

const Chart = ({ type, data, options }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        chartRef.current = new (window as any).Chart(ctx, { type, data, options });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [type, data, options]);

    return <canvas ref={canvasRef}></canvas>;
};

const NoDataMessage = () => <div className="no-data">No data available for the selected filters.</div>;

const CMODashboard = ({ data, colors, theme }) => {
    const { channelTotals, overallTotals } = data;
    
    if (overallTotals.Impressions === 0) return <NoDataMessage />;

    const overallCVR = overallTotals.Clicks > 0 ? overallTotals.Conversions / overallTotals.Clicks : 0;
    const overallCTR = overallTotals.Impressions > 0 ? overallTotals.Clicks / overallTotals.Impressions : 0;

    const sortedByRevenue = [...channelTotals].sort((a, b) => b.Revenue - a.Revenue);
    const sortedByImpressions = [...channelTotals].sort((a, b) => b.Impressions - a.Impressions);
    const sortedByCTR = [...channelTotals].sort((a, b) => (b.Clicks / b.Impressions || 0) - (a.Clicks / a.Impressions || 0));
    const sortedByCVR = [...channelTotals].sort((a, b) => (b.Conversions / b.Clicks || 0) - (a.Conversions / a.Clicks || 0));

    const textColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
        },
    };

    return (
        <div>
            <div className="kpi-grid">
                <div className="kpi-card"><h3>Ad Revenue</h3><p>{formatCurrency(overallTotals.Revenue)}</p></div>
                <div className="kpi-card"><h3>New Customers</h3><p>{formatNumber(overallTotals.New_Customers)}</p></div>
                <div className="kpi-card"><h3>Click-Through Rate</h3><p>{formatPercentage(overallCTR)}</p></div>
                <div className="kpi-card"><h3>Conversion Rate</h3><p>{formatPercentage(overallCVR)}</p></div>
            </div>
            <div className="chart-grid">
                <div className="chart-card" style={{gridColumn: '1 / -1'}}>
                    <h3>Revenue by Channel</h3>
                    <div style={{height: '350px'}}>
                        <Chart type="bar"
                            data={{
                                labels: sortedByRevenue.map(c => c.channel),
                                datasets: [{
                                    label: 'Total Revenue',
                                    data: sortedByRevenue.map(c => c.Revenue),
                                    backgroundColor: sortedByRevenue.map(c => colors[c.channel]),
                                }]
                            }}
                            options={{...chartOptions, indexAxis: 'y', plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Impressions by Channel</h3>
                    <div style={{height: '300px'}}>
                        <Chart type="bar"
                            data={{
                                labels: sortedByImpressions.map(c => c.channel),
                                datasets: [{
                                    label: 'Impressions',
                                    data: sortedByImpressions.map(c => c.Impressions),
                                    backgroundColor: sortedByImpressions.map(c => colors[c.channel]),
                                }]
                            }}
                            options={{...chartOptions, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="chart-card">
                    <h3>New vs. Returning Customers</h3>
                     <div style={{height: '300px'}}>
                        <Chart type="doughnut"
                            data={{
                                labels: ['New Customers', 'Returning Customers'],
                                datasets: [{
                                    data: [overallTotals.New_Customers, overallTotals.Returning_Customers],
                                    backgroundColor: [colors.NewCustomer, colors.ReturningCustomer],
                                }]
                            }}
                            options={{...chartOptions, scales: {}, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                 <div className="chart-card">
                    <h3>Click-Through Rate (CTR)</h3>
                     <div style={{height: '300px'}}>
                        <Chart type="bar"
                            data={{
                                labels: sortedByCTR.map(c => c.channel),
                                datasets: [{
                                    label: 'CTR',
                                    data: sortedByCTR.map(c => c.Impressions > 0 ? c.Clicks / c.Impressions : 0),
                                    backgroundColor: sortedByCTR.map(c => colors[c.channel]),
                                }]
                            }}
                            options={{...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, callback: formatPercentage } } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Conversion Rate (CVR)</h3>
                    <div style={{height: '300px'}}>
                         <Chart type="bar"
                            data={{
                                labels: sortedByCVR.map(c => c.channel),
                                datasets: [{
                                    label: 'CVR',
                                    data: sortedByCVR.map(c => c.Clicks > 0 ? c.Conversions / c.Clicks : 0),
                                    backgroundColor: sortedByCVR.map(c => colors[c.channel]),
                                }]
                            }}
                           options={{...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, callback: formatPercentage } } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CFODashboard = ({ data, colors, theme }) => {
    const { channelTotals, filteredFinanceData, financeTotals, overallTotals } = data;
    
    if (financeTotals.Actual_Spend === 0 && financeTotals.Total_Revenue === 0) return <NoDataMessage />;

    const blendedROAS = overallTotals.Spend > 0 ? overallTotals.Revenue / overallTotals.Spend : 0;
    const cac = overallTotals.New_Customers > 0 ? overallTotals.Spend / overallTotals.New_Customers : 0;
    const marketingProfit = financeTotals.Gross_Margin - financeTotals.Actual_Spend;

    const sortedByROAS = [...channelTotals].sort((a, b) => (b.Revenue / b.Spend || 0) - (a.Revenue / a.Spend || 0));
    const sortedByCPA = [...channelTotals].sort((a, b) => (a.Spend / a.Conversions || Infinity) - (b.Spend / b.Conversions || Infinity));

    const textColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
        },
    };
    
    const chartOptionsWithLegend = {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
            x: { ticks: { color: textColor }, grid: { color: gridColor } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } },
        },
    };
    
    return (
        <div>
            <div className="kpi-grid">
                <div className="kpi-card"><h3>Total Spend</h3><p>{formatCurrency(financeTotals.Actual_Spend)}</p></div>
                <div className="kpi-card"><h3>Blended ROAS</h3><p>{formatRatio(blendedROAS)}x</p></div>
                <div className="kpi-card"><h3>CAC</h3><p>{formatCurrency(cac)}</p></div>
                <div className="kpi-card"><h3>Marketing Profit</h3><p>{formatCurrency(marketingProfit)}</p></div>
            </div>
            <div className="chart-grid">
                <div className="chart-card" style={{gridColumn: '1 / -1'}}>
                    <h3>Budget vs. Actual Spend</h3>
                    <div style={{height: '350px'}}>
                        <Chart type="line"
                            data={{
                                labels: filteredFinanceData.map(d => d.Month),
                                datasets: [
                                    { label: 'Marketing Budget', data: filteredFinanceData.map(d => d.Marketing_Budget), borderColor: colors.Budget, tension: 0.1, fill: false },
                                    { label: 'Actual Spend', data: filteredFinanceData.map(d => d.Actual_Spend), borderColor: colors.Spend, tension: 0.1, fill: false }
                                ]
                            }}
                            options={chartOptionsWithLegend} />
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Return on Ad Spend (ROAS)</h3>
                    <div style={{height: '300px'}}>
                        <Chart type="bar"
                            data={{
                                labels: sortedByROAS.map(c => c.channel),
                                datasets: [{
                                    label: 'ROAS',
                                    data: sortedByROAS.map(c => c.Spend > 0 ? c.Revenue / c.Spend : 0),
                                    backgroundColor: sortedByROAS.map(c => colors[c.channel]),
                                }]
                            }}
                            options={{...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, callback: (value) => formatRatio(value) + 'x' } } }, plugins: { legend: { display: false } } }}/>
                    </div>
                </div>
                <div className="chart-card">
                    <h3>Cost Per Acquisition (CPA)</h3>
                     <div style={{height: '300px'}}>
                        <Chart type="bar"
                            data={{
                                labels: sortedByCPA.map(c => c.channel),
                                datasets: [{
                                    label: 'CPA',
                                    data: sortedByCPA.map(c => c.Conversions > 0 ? c.Spend / c.Conversions : 0),
                                    backgroundColor: sortedByCPA.map(c => colors[c.channel]),
                                }]
                            }}
                           options={{...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, callback: (value) => formatCurrency(value) } } }, plugins: { legend: { display: false } } }} />
                    </div>
                </div>
                 <div className="chart-card" style={{gridColumn: '1 / -1'}}>
                    <h3>Marketing Efficiency Ratio (MER)</h3>
                     <div style={{height: '300px'}}>
                        <Chart type="line"
                            data={{
                                labels: filteredFinanceData.map(d => d.Month),
                                datasets: [{
                                    label: 'MER',
                                    data: filteredFinanceData.map(d => d.Actual_Spend > 0 ? d.Total_Revenue / d.Actual_Spend : 0),
                                    borderColor: colors.Revenue,
                                    tension: 0.1,
                                    fill: false
                                }]
                            }}
                            options={{...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, callback: (value) => formatRatio(value) + 'x' } } }, plugins: { legend: { display: false } } }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);