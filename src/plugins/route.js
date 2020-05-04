import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../view/site/HomePage'
import LoginPage from '../view/site/LoginPage';
import Dashboard from '../view/admin/Dashboard';
//Admin page route..
import DashboardPage from '../view/admin/dashboard/DashboardPage';
import OrderPage from '../view/admin/order/OrderPage';
import ProductPage from '../view/admin/product/ProductPage';
import NewProduct from '../view/admin/product/NewProduct';
import CategoryPage from '../view/admin/category/CategoryPage';
import CategoryForm from '../view/admin/category/CategoryForm';
import CouponPage from '../view/admin/coupon/CouponPage';
import CustomerPage from '../view/admin/customer/CustomerPage';
import BlogPage from '../view/admin/blog/BlogPage';
import NewPost from '../view/admin/blog/NewPost';
import NotificationPage from '../view/admin/notification/NotificationPage';
import SettingsPage from '../view/admin/settings/SettingsPage';
import AppPage from '../view/admin/app/AppPage';
import AboutPage from '../view/admin/about/AboutPage';
import ProfilePage from '../view/admin/profile/ProfilePage';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {path: '/', component: HomePage},
        {path: '/login', component: LoginPage},
        {
            path: '/admin', 
            component: Dashboard,
            children:[
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: DashboardPage,
                },
                {
                    path: 'order',
                    name: 'Order',
                    component: OrderPage,
                },
                {
                    path: 'product',
                    name: 'Product',
                    component: ProductPage,
                },
                {
                    path: 'new-product',
                    name: 'New Product',
                    component: NewProduct,
                },
                {
                    path: 'category',
                    name: 'Category',
                    component: CategoryPage,
                },
                {
                    path: 'new-category',
                    name: 'New Category',
                    component: CategoryForm,
                },
                {
                    path: 'edit-category/:id',
                    name: 'Edit Category',
                    component: CategoryForm,
                },
                {
                    path: 'coupon',
                    name: 'Coupon',
                    component: CouponPage,
                },
                {
                    path: 'customer',
                    name: 'Customer',
                    component: CustomerPage,
                },
                {
                    path: 'blog',
                    name: 'Blog',
                    component: BlogPage,
                },
                {
                    path: 'new-post',
                    name: 'New Post',
                    component: NewPost,
                },
                {
                    path: 'edit-post/:id',
                    name: 'Edit Post',
                    component: NewPost,
                },
                {
                    path: 'notification',
                    name: 'Notification',
                    component: NotificationPage,
                },
                {
                    path: 'settings',
                    name: 'Settings',
                    component: SettingsPage,
                },
                {
                    path: 'app',
                    name: 'App',
                    component: AppPage,
                },
                {
                    path: 'about',
                    name: 'About',
                    component: AboutPage,
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: ProfilePage,
                },
            ]
        },
    ],
    mode:'history'
});
