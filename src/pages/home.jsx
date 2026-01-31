import home from "../content/home/home.json";

export default function Home() {
  return (
    <div>
      <h2>{home.title}</h2>
      <p>{home.intro}</p>
    </div>
  );
}
