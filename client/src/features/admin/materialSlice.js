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
  async ({
    materialId,
    formData,
    restore = false,
    productSolded,
    handleUnauthorized,
  }) => {
    await Patch(`materials/${materialId}`, formData, null, handleUnauthorized);
    return { materialId, productSolded, formData, restore };
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
  initialState: { data: [], materialId: "", status: "idle", error: null },
  reducers: {
    materialIdToRemove: (state, action) => {
      state.materialId = action.payload;
    },
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
        toast.success("Le nouveau matériau a bien été enregistré 😀");
        state.data = state.data.concat(action.payload);
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        const { materialId, productSolded, formData, restore } = action.payload;

        // Trouver l'index du matériau à mettre à jour dans le state
        const updatedMaterialIndex = state.data.findIndex(
          (material) => material._id === materialId
        );

        if (updatedMaterialIndex !== -1) {
          // Créer une nouvelle copie du matériau avec les modifications
          const updatedMaterial = {
            ...state.data[updatedMaterialIndex],
            ...formData,
          };

          // Créer une nouvelle copie du state avec le matériau mise à jour
          const newState = {
            ...state,
            data: [
              ...state.data.slice(0, updatedMaterialIndex),
              updatedMaterial,
              ...state.data.slice(updatedMaterialIndex + 1),
            ],
          };

          // Si productSolded est true, marquer le matériau comme archivé
          if (productSolded) {
            updatedMaterial.isArchived = true;
            toast.success("Le matériau a bien été archivé.");
          } else if (restore) {
            toast.success("Le matériau a bien été restauré.");
          } else {
            toast.success("Le matériau a bien été modifié 😀");
          }

          return newState;
        }

        // Si le matériau n'est pas trouvé, retourner simplement le state inchangé
        return state;
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
export const { materialIdToRemove } = materialSlice.actions;
export default materialSlice.reducer;
