import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRPaymentRequest } from './QRPaymentRequest';

const meta = {
  title: 'Components/QRPaymentRequest',
  component: QRPaymentRequest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QRPaymentRequest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    destination: 'GBXWCJVZR57RNIROBIIJHN433XDZUJVG7JW2ASZIUILTLBRG5BZQRP4Q',
    amount: '50.00',
    assetCode: 'XLM',
    memo: 'Coffee',
  },
};

export const NoAmount: Story = {
  args: {
    destination: 'GBXWCJVZR57RNIROBIIJHN433XDZUJVG7JW2ASZIUILTLBRG5BZQRP4Q',
  },
};

export const CustomAsset: Story = {
  args: {
    destination: 'GBXWCJVZR57RNIROBIIJHN433XDZUJVG7JW2ASZIUILTLBRG5BZQRP4Q',
    amount: '1000',
    assetCode: 'USDC',
  },
};

export const InvalidAddress: Story = {
  args: {
    destination: 'not-a-valid-stellar-address',
    amount: '50.00',
  },
};
