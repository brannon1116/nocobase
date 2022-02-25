import { BlockInitializers } from './BlockInitializers';
import { CalendarActionInitializers } from './CalendarActionInitializers';
import { DetailsActionInitializers } from './DetailsActionInitializers';
import { FormActionInitializers } from './FormActionInitializers';
import { GridFormItemInitializers } from './GridFormItemInitializers';
import * as Items from './Items';
import { PopupFormActionInitializers } from './PopupFormActionInitializers';
import { RecordBlockInitializers } from './RecordBlockInitializers';
import { TableActionInitializers } from './TableActionInitializers';
import { TableColumnInitializers } from './TableColumnInitializers';
import { TableRecordActionInitializers } from './TableRecordActionInitializers';

export const items = { ...Items };

export const initializes = {
  // 页面里的「添加区块」
  BlockInitializers,
  // 日历的「操作配置」
  CalendarActionInitializers,
  // 详情的「操作配置」
  DetailsActionInitializers,
  // 普通表单的「操作配置」
  FormActionInitializers,
  // Grid 组件里「配置字段」
  GridFormItemInitializers,
  // 弹窗表单的「操作配置」
  PopupFormActionInitializers,
  // 当前行记录所在面板的「添加区块」
  RecordBlockInitializers,
  // 表格「操作配置」
  TableActionInitializers,
  // 表格「列配置」
  TableColumnInitializers,
  // 表格当前行记录的「操作配置」
  TableRecordActionInitializers,
};