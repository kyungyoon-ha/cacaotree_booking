import axios from 'axios';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { BlockDates } from 'src/types';

type BlockDateType = 'firstday' | 'daytime';

export default function useBlockDates(type: BlockDateType) {
  const [blockDates, setBlockDates] = useState<BlockDates | null>(null);

  useEffect(() => {
    axios.get('/api/GetBlockDate')
      .then((res) => setBlockDates(res.data.data))
      .catch(() => setBlockDates({ blockDatesFirstday: [], blockDatesDaytime: [] }));
  }, []);

  const disabledDate = useCallback(
    (current: dayjs.Dayjs): boolean => {
      const dates =
        type === 'firstday'
          ? blockDates?.blockDatesFirstday
          : blockDates?.blockDatesDaytime;

      if (dates?.length) {
        return (
          dayjs().add(1, 'days') >= current ||
          !!dates.find((date) => date === dayjs(current).format('YYYY-MM-DD'))
        );
      }
      return dayjs().add(1, 'days') >= current;
    },
    [blockDates, type]
  );

  return { disabledDate, isLoading: blockDates === null };
}
