import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Feather } from '@expo/vector-icons'

import { THEME } from '~/theme'

type Variants = 'primary' | 'success' | 'alert'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
  variant?: Variants
}

function Button({
  children,
  isLoading,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        clsx('flex-row items-center gap-3 rounded-lg px-4 py-3', {
          'bg-PRIMARY': variant === 'primary',
          'bg-SUCCESS': variant === 'success',
          'bg-red-500': variant === 'alert',
        }),
        className
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ActivityIndicator className="text-white " /> : children}
    </TouchableOpacity>
  )
}

function Title({ children, className }: TextProps) {
  return (
    <Text className={twMerge('font-SEMI_BOLD text-MD text-white', className)}>
      {children}
    </Text>
  )
}

interface IconProps {
  icon: keyof typeof Feather.glyphMap
}

function Icon({ icon }: IconProps) {
  return <Feather name={icon} size={24} color={THEME.COLORS.WHITE} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
