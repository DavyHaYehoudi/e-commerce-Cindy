import React, { useState } from "react";
import TabBar from "./TabBar";

const Statistics = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="statistics">
      <h1>STATISTIQUES</h1>

      <select
        className="select-date account-input"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">Sélectionner une année</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
        <option value="-1">Toutes années confondues</option>
      </select>

      <TabBar selectedYear={selectedYear} />
    </div>
  );
};

export default Statistics;
