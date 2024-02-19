import { useState } from 'react'
import { useField } from 'react-final-form'

import { InputBase, ListItemIcon, MenuItem, Select, SvgIcon, Typography } from '@mui/material'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import Error from './Error.jsx'
import { fieldWidthSizes } from '../../helpers/helpers.jsx'

const BootstrapInput = ({ rootClasses, ...props }) => (
  <InputBase
    classes={{
      root: `block border-2 border-gray-900 w-full bg-white box-border ${rootClasses}`,
      input: 'box-border flex items-center text-base focus:outline-main'
    }}
    {...props}
  />
)

const ArrowDownIcon = props => (
  <SvgIcon {...props}>
    <path
      d="M8.12539 8.99953L12.0054 12.8795L15.8854 8.99953C16.2754 8.60953 16.9054 8.60953 17.2954 8.99953C17.6854 9.38953 17.6854 10.0195 17.2954 10.4095L12.7054 14.9995C12.3154 15.3895 11.6854 15.3895 11.2954 14.9995L6.70539 10.4095C6.31539 10.0195 6.31539 9.38953 6.70539 8.99953C7.09539 8.61953 7.73539 8.60953 8.12539 8.99953Z"
      fill="black"
    />
  </SvgIcon>
)

const ArrowDownDisabledIcon = props => (
  <SvgIcon {...props}>
    <path
      d="M8.12502 9.00002L12.005 12.88L15.885 9.00002C16.275 8.61002 16.905 8.61002 17.295 9.00002C17.685 9.39002 17.685 10.02 17.295 10.41L12.705 15C12.315 15.39 11.685 15.39 11.295 15L6.70503 10.41C6.31503 10.02 6.31503 9.39002 6.70503 9.00002C7.09503 8.62002 7.73502 8.61002 8.12502 9.00002Z"
      fill="#8A94A2"
    />
  </SvgIcon>
)

export const SelectInput = ({
  name,
  label,
  hint,
  children,
  className,
  size = 'xl',
  parentClassName,
  orientation,
  background,
  native = false,
  disabled = false,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isHorizontal = orientation === 'horizontal'

  return (
    <div className={clsx(parentClassName, isHorizontal ? 'block md:flex items-baseline' : '')}>
      {label && (
        <label htmlFor={`${name}-input`} className={clsx('block font-bold mb-2 min-w-fit', { 'mr-4': isHorizontal })}>
          {label}
        </label>
      )}
      {hint && (
        <p id={`${name}-hint`} className="break-words mb-2">
          {hint}
        </p>
      )}
      <Select
        className={clsx(className, 'text-base', background, { relative: isHorizontal }, fieldWidthSizes[size])}
        native={native}
        disabled={disabled}
        IconComponent={disabled ? ArrowDownDisabledIcon : ArrowDownIcon}
        input={
          <BootstrapInput
            id={`${name}-input`}
            rootClasses={clsx(anchorEl ? 'rounded-t' : 'rounded', {
              'bg-blue-300 text-gray-90 border-gray-100': disabled
            })}
          />
        }
        classes={{ root: '!p-0', icon: 'mr-3' }}
        onOpen={({ currentTarget }) => setAnchorEl(currentTarget)}
        onClose={() => setAnchorEl(null)}
        MenuProps={{
          classes: { list: 'border-2 border-gray-900 rounded-b', paper: '!rounded-t-none !shadow-none' },
          anchorEl: anchorEl,
          getContentAnchorEl: null,
          PaperProps: { style: { width: anchorEl ? anchorEl.clientWidth + 4 : 0 } },
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          transformOrigin: { vertical: 'top', horizontal: 'center' }
        }}
        {...props}
      >
        {children}
      </Select>
    </div>
  )
}

const SelectField = ({
  options = [],
  label,
  className,
  parentClassName,
  size,
  name,
  validate,
  native,
  hint = '',
  disabled = false,
  containerClassName = 'mb-6',
  orientation = 'vertical',
  background = 'bg-white',
  displayEmpty = true,
  defaultOption = 'Selecciona',
  initialValue,
  errorClassName,
  ...props
}) => {
  const { input } = useField(name, { validate, initialValue, ...props })

  return (
    <div className={clsx(containerClassName, 'relative')}>
      <SelectInput
        name={name}
        label={label}
        className={className}
        parentClassName={parentClassName}
        native={native}
        size={size}
        hint={hint}
        disabled={disabled}
        orientation={orientation}
        background={background}
        displayEmpty={displayEmpty}
        {...input}
        onChange={e => {
          input.onChange(e.target.value)
          props.onChange && props.onChange(e.target.value)
        }}
      >
        {defaultOption && (
          <MenuItem
            className="text-base !p-0 hover:!bg-blue-40"
            classes={{ selected: '!bg-white' }}
            value=""
            disableRipple
          >
            <Typography className="text-base whitespace-normal text-neutral-900 leading-6 px-4 py-2.5">
              {defaultOption}
            </Typography>
          </MenuItem>
        )}
        {options.map(o => (
          <MenuItem
            key={o.value}
            className="text-base !p-0 hover:!bg-blue-40"
            classes={{ selected: '!bg-white' }}
            value={o.value}
            disableRipple
          >
            {o.icon && <ListItemIcon>{o.icon}</ListItemIcon>}
            <Typography className="text-base whitespace-normal leading-6 px-4 py-2.5">{o.label}</Typography>
          </MenuItem>
        ))}
      </SelectInput>
      <Error name={name} className={clsx('pt-2', errorClassName)} />
    </div>
  )
}

export default SelectField

SelectField.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
  parentClassName: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  validate: PropTypes.func,
  native: PropTypes.bool,
  disabled: PropTypes.bool,
  hint: PropTypes.string,
  containerClassName: PropTypes.string,
  displayEmpty: PropTypes.bool,
  orientation: PropTypes.string,
  background: PropTypes.string,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func,
  initialValue: PropTypes.node,
  errorClassName: PropTypes.string
}

SelectInput.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
  parentClassName: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  native: PropTypes.bool,
  orientation: PropTypes.string,
  background: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.array
}

BootstrapInput.propTypes = {
  rootClasses: PropTypes.string
}
