import _ from 'lodash';
import {colors} from '@mui/material';

const getRandomColor = () => {
  const outputs = [colors.red, colors.blue, colors.amber, colors.brown, colors.cyan, colors.green, colors.lime, colors.orange, colors.yellow];
  const index = _.random(0, outputs.length);
  return outputs[index][500];
};

export const styleUtils = {
  getRandomColor,
};
