import { baseUrl } from "./BaseUrl";


export const loginApi=baseUrl+"/login"
export const changePasswordApi=baseUrl+"/change-password"
export const isAdminLogin=baseUrl+"/is-admin-login"

//====================== Dashboard ===========================
export const getDashboardApi="/get-dashboard"

// ===================== Promotion Banner =========================
export const addBannerApi="/insert-banner"
export const updateBannerApi="/update-banner"
export const deleteBannerApi="/delete-banner"
export const getBannerApi="/get-banner"

//======================= USer ==============================
export const getAllUserApi="/get-users"

//===================== Main Category ========================
export const addMainCategoryApi="/insert-main-category"
export const getMainCategoryApi="/get-main-category"
export const updateMainCategoryApi="/update-main-category"
export const updateMainCategoryStatusApi="/update-main-category-status"

//========================== Category ========================
export const addCategoryApi="/insert-category"
export const getCategoryApi="/get-category"
export const updateCategoryApi="/update-category"
export const updateCategoryStatusApi="/update-category-status"

//====================== Sub Category ===========================
export const addSubCategoryApi="/insert-sub-category"
export const getSubCategoryApi="/get-sub-category"
export const updateSubCategoryApi="/update-sub-category"
export const updateSubCategoryStatusApi="/update-sub-category-status"

//========================== Products =======================
export const addProductApi="/insert-product"
export const getProductApi="/get-products"
export const getProductById="/get-product-by-id"

//======================= home title ==================
export const addHomeTitleApi="/insert-home-title"
export const getHomeTitleApi="/get-home-title"
export const updateHomeTitleApi="/update-home-title"
export const deleteHomeTitleApi="/delete-home-title"
export const updateHomeTitleStatusApi="/update-home-title-staus"
export const getHomeTitleByIdApi="/get-home-title-by-id"
export const addHomeProduct="/add-home-product"

//======================== Site Policy=======================
export const addUpdateSitePolicyApi="/add-update-sitepolicy"
export const getSitePolicyApi="/get-sitepolicy"

//================= Faq =================== 
export const addFaqApi="/add-faq"
export const getFaqApi="/get-faq"
export const deleteFaqApi="/delete-faq"
export const updateFaqStatusApi="/update-faq-status"
export const updateFaqApi="/update-faq"

//=============== Order ====================
export const getOrderApi="/get-order"