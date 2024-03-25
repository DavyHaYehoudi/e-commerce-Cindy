import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

const fetchMaterials = createAsyncThunk(
  "material/fetchMaterials",
  async () => {
    try {
      return customFetch("materials");
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const addMaterial = createAsyncThunk(
  "material/addMaterials",
  async (materialData) => {
    const response = await customFetch("materials", {
      method: "POST",
      body: JSON.stringify(materialData),
    });
    return response;
  }
);

const updateMaterial = createAsyncThunk(
  "material/updateMaterial",
  async ({ materialId, editedproperty}) => {
    const response = await customFetch(`materials/${materialId}`, {
      method: "PATCH",
      body: JSON.stringify(editedproperty),
    });
    return response;
  }
);
const deleteMaterial = createAsyncThunk(
  "material/deleteMaterial",
  async (materialId) => {
    await customFetch(`materials/${materialId}`, {
      method: "DELETE",
    });
    return materialId;
  }
);
const materialSlice = createSlice({
  name: "material",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.data = state.data.map((material) =>
          material._id === action.payload._id ? action.payload : material
        );
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (material) => material._id !== action.payload
        );
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      });
  },
});
export { fetchMaterials, addMaterial, deleteMaterial, updateMaterial };
export default materialSlice.reducer;
