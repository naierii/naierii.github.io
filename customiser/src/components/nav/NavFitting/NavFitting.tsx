import OptionButton from '@components/ui/OptionButton';
import { CustomProductOptionFragment } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import { motion } from 'framer-motion';
import NavButtons from '../NavButtons';
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
    <>
      <motion.div
        className={styles.fittingOption}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
      </motion.div>
    </>
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
      <NavButtons />
    </>
  );
};

export default NavFitting;
