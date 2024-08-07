import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError, IQueryParamsWithId } from 'app/shared/reducers/reducer.utils';
import { IBill, defaultValue } from 'app/shared/model/bill.model';
import { IBillElement } from 'app/shared/model/bill-element.model';
// import { BillForm } from 'app/shared/model/billForm.model';

const initialState: EntityState<IBill> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/bills';

// Actions

export const getEntities = createAsyncThunk('bill/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IBill[]>(requestUrl);
});

export const getEntitiesBis = createAsyncThunk('bill/fetch_entity_list', async ({ id, page, size, sort }: IQueryParamsWithId) => {
  const requestUrl = `${apiUrl}bis/${id}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IBill[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'bill/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IBill>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'bill/create_entity',
  async (entity: IBill, thunkAPI) => {
    const result = await axios.post<IBill>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// export const createEntityBis = createAsyncThunk(
//   'bill/create_entity',
//   async (entity: BillForm, thunkAPI) => {
//     const result = await axios.post<BillForm>(apiUrl + 'bis', cleanEntity(entity));
//     thunkAPI.dispatch(getEntities({}));
//     return result;
//   },
//   { serializeError: serializeAxiosError }
// );

export const updateEntity = createAsyncThunk(
  'bill/update_entity',
  async (entity: IBill, thunkAPI) => {
    const result = await axios.put<IBill>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'bill/partial_update_entity',
  async (entity: IBill, thunkAPI) => {
    const result = await axios.patch<IBill>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'bill/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IBill>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const BillSlice = createEntitySlice({
  name: 'bill',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = BillSlice.actions;

// Reducer
export default BillSlice.reducer;
