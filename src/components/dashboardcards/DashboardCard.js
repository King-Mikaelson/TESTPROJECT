import "./DashboardCard.css";

export default function DashboardCard({
  numbers,
  title,
  title2,
  title3,
  color,
  styling,
}) {
  return (
    <div style={{ backgroundColor: color }} className={styling}>
      <p>{title}</p>
      {numbers && <p>{numbers}</p>}
      {title2 && <p>{title2}</p>}
      {title3 && <p>{title3}</p>}
    </div>
  );
}
