<?php
class SomethingDigital_RecentlyViewed_Model_Adminhtml_System_Config_SdRecentlyViewedPosition
{
   public function toOptionArray()
   {
       $position = array(
           array( 'value' => 'top',    'label' => 'Top'    ),
           array( 'value' => 'bottom', 'label' => 'Bottom' ),
           array( 'value' => 'above',  'label' => 'Above'  ),
           array( 'value' => 'below',  'label' => 'Below'  ),
       );
 
       return $position;
   }
}