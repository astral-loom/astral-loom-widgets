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
    destination: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OAWBK6POU4',
    amount: '50.00',
    assetCode: 'XLM',
    memo: 'Coffee',
  },
};

export const NoAmount: Story = {
  args: {
    destination: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OAWBK6POU4',
  },
};

export const CustomAsset: Story = {
  args: {
    destination: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OAWBK6POU4',
    amount: '1000',
    assetCode: 'USDC',
  },
};
