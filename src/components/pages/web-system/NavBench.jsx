import LandingNav from '@/components/ui/LandingNav';
import Shelf, { Line, Fig } from './Shelf';
import AppNav from './AppNav';
import { NavAnatomy } from './Arts';
import s from './web-system.module.css';

export default function NavBench() {
  return (
    <Shelf id="navigation" title="Navigation bar" note="Logo tile, one pale pill holding four links, an icon button and Log in. The app uses a vertical rail of square icons and a top tab strip with the active tab in yellow.">
      <Line label="Landing nav on the blue field">
        <div className={`field ${s.stage}`}>
          <LandingNav current="lp-progress" tone="blue" />
        </div>
      </Line>
      <Line label="Landing nav on paper">
        <div className={s.paperStage}>
          <LandingNav current="lp-progress" tone="light" />
        </div>
      </Line>
      <Line label="App tab strip and left icon rail">
        <AppNav />
      </Line>
      <Fig caption="Landing navigation with its measurements.">
        <NavAnatomy />
      </Fig>
    </Shelf>
  );
}
