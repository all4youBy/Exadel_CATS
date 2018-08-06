import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const createInsitutionOptions = insitutions => insitutions.map(institution => (
  <Option value={institution.id} key={institution.id}>
    {institution.name}
  </Option>
));

export const createPrimarySkillOptions = primarySkills => primarySkills.map(primarySkill => (
  <Option value={primarySkill} key={primarySkill}>
    {primarySkill}
  </Option>
));
