import React from 'react';
import { technologies } from '../../constants';

import './SkillInput.css';

const SkillInput = ({ onChange, placeholder, value }) => (
  <div>
    <input
      placeholder={placeholder}
      className="SkillInput__input"
      value={value}
      list="technologies"
      onChange={onChange}
    />
    <datalist id="technologies">{technologies.map(t => <option>{t}</option>)}</datalist>
  </div>
);

export default SkillInput;
