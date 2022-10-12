import OptionButton from '@components/ui/OptionButton';
import { CustomProductOptionFragment } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';

import styles from './NavFitting.module.scss';

export interface FittingOptionProps {
  option: CustomProductOptionFragment;
}

const FittingOption = ({ option }: FittingOptionProps) => {
  const selectedModels = useCustomiserStore((state) => state.selectedModels);
  const setSelectedModel = useCustomiserStore((state) => state.setSelectedModel);

  if (!option) {
    return null;
  }

  const getSelected = selectedModels.find((m) => m.optionId === option.id)?.model;

  return (
    <div className={styles.fittingOption}>
      <h3>{option.name}</h3>
      <div className={styles.fittingButtons}>
        {option.models?.map((m) => (
          <OptionButton
            key={m?.id}
            selected={getSelected?.id === m?.model?.data?.id}
            onClick={() => setSelectedModel(option.id, m?.model?.data)}
          >
            {m?.model?.data?.attributes?.name}
          </OptionButton>
        ))}
      </div>
    </div>
  );
};

const NavFitting = () => {
  const fittingOptions = useCustomiserStore(
    (state) => state.customProduct?.attributes?.options,
  ) as Array<CustomProductOptionFragment>;

  return (
    <>
      {fittingOptions?.map((o) => (
        <FittingOption key={o?.id} option={o} />
      ))}
    </>
  );
};

export default NavFitting;
