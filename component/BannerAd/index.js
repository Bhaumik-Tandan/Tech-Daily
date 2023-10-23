import BannerAd from './BannerAd';
import SampleBox from './SampleBox';
import {ENV} from "@env";
const BannerAdComponent = ENV === 'development' ? SampleBox:BannerAd;


export default BannerAdComponent;
