export type ConfirmProps = {
    onClick: () => Promise<void>;
  handleCancel: () => void;
  show: boolean;
  disabled: boolean;
  confirmName:string;
}