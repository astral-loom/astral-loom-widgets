import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetBadge } from './AssetBadge';

const meta = {
  title: 'Components/AssetBadge',
  component: AssetBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  },
} satisfies Meta<typeof AssetBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NativeXLM: Story = {
  args: {
    assetCode: 'XLM',
    size: 'md',
  },
};

export const CustomUSDC: Story = {
  args: {
    assetCode: 'USDC',
    issuer: 'GBBD47IF6LWK7P7MDEVSCWTTCJM44NMFQNKCGZ7MC3ZUXL2N6GFTUSDC',
    iconUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    size: 'md',
  },
};

export const CustomTokenNoIcon: Story = {
  args: {
    assetCode: 'AQUA',
    issuer: 'GBBD47IF6LWK7P7MDEVSCWTTCJM44NMFQNKCGZ7MC3ZUXL2N6GFTUSDC',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    assetCode: 'XLM',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    assetCode: 'XLM',
    size: 'lg',
  },
};
