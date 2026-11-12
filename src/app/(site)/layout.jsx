import Sprite from '@/components/site/Sprite';
import Dock from '@/components/site/Dock';
import Toast from '@/components/site/Toast';

// Shared shell for the 30 pages. Every id here starts with "site-". No <h1> lives outside the pages.
export default function SiteLayout({ children }) {
  return (
    <>
      <a className="site-skip" href="#site-main">Skip to content</a>
      <Sprite />
      <main id="site-main">{children}</main>
      <Dock />
      <Toast />
    </>
  );
}
