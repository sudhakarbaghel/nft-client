import { ThemingProps } from '@chakra-ui/react'
import { goerli, sepolia } from 'wagmi/chains'


export const SITE_NAME = 'Nft World'
export const SITE_DESCRIPTION = 'Nft World'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_GITHUB = 'cryptokage2306'

export const NETWORKS = [goerli, sepolia]


