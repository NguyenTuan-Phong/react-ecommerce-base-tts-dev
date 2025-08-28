import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
// const socialLinks = [
//   { name: 'Shopee', url: 'https://shopee.vn/codecshop' },
//   { name: 'Lazada', url: 'https://www.lazada.vn/shop/codecshop/' },
//   { name: 'Instagram', url: 'https://www.instagram.com/lac.dau/' },
//   { name: 'Tiktok', url: 'https://www.tiktok.com/@codecstore' },
//   { name: 'Youtube', url: 'https://www.youtube.com/channel/UC0kL-L4W-QBwgwqCv408J2A' },
//   { name: 'Facebook', url: 'https://www.facebook.com/codecstore' },
// ];
interface Props {
  role: string | undefined;
}
export const HeaderTop = ({ role }: Props) => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-4 shadow-sm'>
      <div className='max-w-8xl mx-auto flex justify-between items-center text-sm'>
        <div className='flex items-center gap-6'>
          <div className="relative group inline-block">
            <span className='flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer'>
              <span className='text-orange-400'>📍</span> Địa chỉ liên hệ
            </span>
            <div className="fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold top-12">
                <div className="bg-orange-300 text-[white] p-2 rounded-[10px] py-2">Địa chỉ</div>
                <p>Địa chỉ: Tầng 8 tòa nhà 3A, số 3 ngõ 82 Duy Tân, phường Dịch Vọng Hậu, quận Cầu Giấy, thành
                phố Hà Nội, Việt Nam</p>
                <p>Số điện thoại: 09637600289</p>
                <p>Địa chỉ email: contact@codec.com</p>
                <p>Giờ mở cửa: 8h30 - 21h30</p>
              </div>
          </div>
          <div className="relative group inline-block">
            <span className='flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer'>
              <span className='text-orange-400'>📞</span> Hotline trực tuyến
            </span>
            <div className="fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold top-12">
              <div className="bg-orange-300 text-[white] p-2 rounded-[10px] py-2">Hotline</div>
              <p>Số điện thoại: 09637600289</p>
              <p>Địa chỉ email: contact@codec.com</p>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-6'>
          {['Shopee', 'Lazada', 'Instagram', 'TikTok', 'YouTube', 'Facebook'].map((platform) => (
            <span
              key={platform}
              className='hover:text-orange-300 transition-colors cursor-pointer text-xs font-medium'
            >
              {platform}
            </span>
          ))}
          <div className='text-white hover:text-orange-300 hover:bg-white/10 transition-all flex gap-1 items-center cursor-pointer'>
            <Sparkles className='w-4 h-4 mr-1' />
            Tin tức
          </div>
          {isLoggedIn ? (
            <div className='hidden lg:flex items-center gap-10'>
              {/* {role === "ROLE_MANAGER" && (     
                                  <AdminNotification/>
                                )} */}
              <Link
                to={'/profile'}
                className={`flex gap-2 items-center ${
                  role !== 'ROLE_MANAGER' && 'text-[white] text-[16px]'
                }`}
              >
                <div className='flex items-center gap-1 text-white hover:text-[#fa7833] transition-colors duration-300'>
                  <UserOutlined style={{ fontWeight: 'bold', fontSize: 22 }} />
                  <b className='hover:cursor-pointer'>{user?.username}</b>
                </div>
              </Link>
            </div>
          ) : (
            <div className='hidden lg:flex items-center gap-2 text-[black]! '>
              <UserSwitchOutlined size={22} />
              <Link className='text-[white]! text-[16px]!' to='/register'>
                Đăng ký
              </Link>
              <p>/</p>
              <Link className='text-[white]! text-[16px]!' to='/login'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        {/* <div className=' items-center gap-2  py-2  hidden lg:flex px-12'>
          <div className='relative group inline-block'>
            <div className='flex items-center gap-6'>
              <span className='flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer'>
                <span className='text-orange-400'>📞</span> Địa chỉ liên hệ
              </span>
            </div>
            <div className='fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold'>
              <div className='bg-[#29a07e] text-[white] p-2 rounded-[10px] py-2'>Địa chỉ</div>
              <p>
                Địa chỉ: Tầng 8 tòa nhà 3A, số 3 ngõ 82 Duy Tân, phường Dịch Vọng Hậu, quận Cầu
                Giấy, thành phố Hà Nội, Việt Nam
              </p>
              <p>Số điện thoại: 0963760289</p>
              <p>Địa chỉ email: contact@codec.com</p>
              <p>Giờ mở cửa: 8h30 - 21h30</p>
            </div>
          </div>
          <div className='relative group inline-block'>
            <span className='flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer'>
              <span className='text-orange-400'>📞</span> Hotline trực tuyến
            </span>
            <div className='fixed w-[350px] bg-white text-black p-2 shadow-lg rounded-md border border-gray-200 z-20 leading-[2.5rem] hidden group-hover:block font-bold'>
              <div className='bg-[#29a07e] text-[white] p-2 rounded-[10px] py-2'>Hotline</div>
              <p>Số điện thoại: 0963760289</p>
              <p>Địa chỉ email: codecshop@gmail.com</p>
            </div>
          </div>

          <div className='flex gap-4 text-white text-sm'>
            <div className='flex gap-4 !text-white text-sm'>
              {socialLinks.map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 !text-white hover:underline'
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div> */}
        {/* <div className='hidden lg:flex items-center gap-2 h-[40px] mr-[30px]! font-bold! pr-10'>
            <NotificationOutlined className='font-bold! text-white!' />
            <Link className='text-[white]! text-[16px]!' to='/news'>
              Tin tức
            </Link>
          </div> */}
      </div>
    </div>
  );
};
