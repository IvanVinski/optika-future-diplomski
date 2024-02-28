export default defineNuxtRouteMiddleware(async () => {
  const user = await getCurrentUser();

  const userStore = useUserStore();

  if (!userStore.data) {
    await userStore.fetch();
  }

  if (!user && userStore.data?.role !== "admin") {
    return navigateTo("/login");
  }
});
