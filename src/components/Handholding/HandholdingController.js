// src/components/Handholding/HandholdingController.js
import data from './Handholding.json';
import { FiTrendingUp, FiShield, FiLayers } from 'react-icons/fi';
import {
  HhWrapper, HhTitle, HhSubtitle,
  HhCards, HhCard, HhIcon, HhCardTitle, HhList, HhListItem,
} from './HandholdingStyles';

const iconMap = {
  growth:   <FiTrendingUp />,
  security: <FiShield />,
  process:  <FiLayers />,
};

const HandholdingController = () => (
  <HhWrapper>
    <HhTitle variant="h2">Guidance That Moves You Forward</HhTitle>
    <HhSubtitle>Thoughtful support, transparent steps, and zero confusion</HhSubtitle>

    <HhCards>
      {data.map((item, index) => (
        <HhCard key={index} variant={item.type}>
          <HhIcon variant={item.type}>{iconMap[item.icon]}</HhIcon>
          <HhCardTitle variant="h3">{item.title}</HhCardTitle>
          <HhList>
            {item.points.map((point, i) => (
              <HhListItem key={i}>{point}</HhListItem>
            ))}
          </HhList>
        </HhCard>
      ))}
    </HhCards>
  </HhWrapper>
);

export default HandholdingController;
