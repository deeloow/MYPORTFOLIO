<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table): void {
            $table->string('professional_title')->nullable();
            $table->string('nursing_school')->nullable();
            $table->string('graduation_year')->nullable();
            $table->json('nursing_interests')->nullable();
            $table->json('personal_values')->nullable();
            $table->text('nursing_journey')->nullable();
            $table->text('nursing_philosophy')->nullable();
            $table->json('skills')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table): void {
            $table->dropColumn([
                'professional_title',
                'nursing_school',
                'graduation_year',
                'nursing_interests',
                'personal_values',
                'nursing_journey',
                'nursing_philosophy',
                'skills',
            ]);
        });
    }
};
