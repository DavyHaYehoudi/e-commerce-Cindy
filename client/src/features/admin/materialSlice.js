import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Del, Get, Patch, Post } from "../../services/httpMethods";

const fetchMaterials = createAsyncThunk("material/fetchMaterials", async () => {
  return Get("materials");
});
const addMaterial = createAsyncThunk(
  "material/addMaterials",
  async ({ newMaterial, handleUnauthorized }) => {
    return await Post("materials", newMaterial, null, handleUnauthorized);
  }
);

const updateMaterial = createAsyncThunk(
  "material/updateMaterial",
  async ({ data, handleUnauthorized }) => {
    const { materialId, name, value } = data;
    return await Patch(
      `materials/${materialId}`,
      { name, value },
      null,
      handleUnauthorized
    );
  }
);
const deleteMaterial = createAsyncThunk(
  "material/deleteMaterial",
  async ({ materialId, handleUnauthorized }) => {
    await Del(`materials/${materialId}`, null, handleUnauthorized);
    return materialId;
  }
);
const materialSlice = createSlice({
  name: "material",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
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
        toast.success("Le nouveau matériau a bien été enregistré 😀");
        state.data = state.data.concat(action.payload);
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        toast.success("Le matériau a bien été modifié 😀");
        state.data = state.data.map((material) =>
          material._id === action.payload._id ? action.payload : material
        );
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        toast.success("Le matériau a bien été supprimé 😀");
        state.data = state.data.filter(
          (material) => material._id !== action.payload
        );
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchMaterials, addMaterial, deleteMaterial, updateMaterial };
export default materialSlice.reducer;
