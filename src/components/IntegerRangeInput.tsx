import * as React from 'react';
import Select from './Select'

interface IntegerRangeInputProps {
  initialValue?: string,
  initialBounds?: string,
  boundsOptions: { value: string, name: string }[],
  onChange: (value: any) => void,
  vocab?: { value: string, bounds: string },
}

export default function IntegerRangeInput ({ initialValue = "", initialBounds = undefined, boundsOptions, onChange, vocab={ value: "value", bounds: "bounds" } }: IntegerRangeInputProps) {

  return (
    <div>
      <label>Age: </label>
      <input 
        type='number' 
        min='0'
        step='1'
        value={ initialValue }
        onChange={ (e) => onChange({ [vocab.value]: e.target.value })  }/>
      <Select 
        defaultValue={ initialBounds } 
        data={ boundsOptions } 
        onChange={ (value) => onChange({ [vocab.bounds]: value }) } />
    </div>
  );
}

