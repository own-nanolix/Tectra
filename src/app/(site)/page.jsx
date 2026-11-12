import Overview, { metadata as overviewMeta } from './overview/page';

// "/" shows the overview page.
export const metadata = overviewMeta;

export default function Home() {
  return <Overview />;
}
