import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionHistory } from './TransactionHistory';

const meta = {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    network: {
      control: 'radio',
      options: ['testnet', 'mainnet']
    },
    limit: {
      control: { type: 'number', min: 1, max: 200 }
    }
  },
} satisfies Meta<typeof TransactionHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

// A real testnet account with history
export const Default: Story = {
  args: {
    publicKey: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OAWBK6POU4',
    network: 'testnet',
    limit: 10
  },
};

export const EmptyAccount: Story = {
  args: {
    // Generate a fresh random pubkey to simulate no history
    publicKey: 'GAB42X7GGEKQKJZYV7ZMBYY44YF3XN4B64L4O5UWV67W4I2K4S4E4S4E',
    network: 'testnet',
    limit: 10
  },
};

export const NoKeyProvided: Story = {
  args: {
    publicKey: '',
    network: 'testnet'
  },
};
