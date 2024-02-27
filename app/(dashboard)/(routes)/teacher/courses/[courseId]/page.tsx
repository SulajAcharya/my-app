import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db"; 
import { IconBadge } from "@/components/icon-badge";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";

const CourseIdPage = async ({
    params
}:{
    params:{courseId: string}
}) => {

    const { userId } = auth();

    if(!userId){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId
        }
    });
    
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    console.log(categories)

    if(!course){
        return redirect("/");
    }
    const requiredFields =[
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initialData={{ title: course.title! }} // Using non-null assertion operator to indicate that course.title will never be null
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={{ 
                            id: course.id,
                            userId: course.userId, // Assuming these properties are available in your 'course' object
                            title: course.title,
                            description: course.description!,
                            imageUrl: course.imageUrl,
                            price: course.price,
                            isPublished: course.isPublished,
                            categoryId: course.categoryId,
                            createdAt: course.createdAt,
                            updatedAt: course.updatedAt
                        }}
                            // description: course.description! }} // Using non-null assertion operator to indicate that course.description will never be null
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={{ 
                            id: course.id,
                            userId: course.userId, // Assuming these properties are available in your 'course' object
                            title: course.title,
                            description: course.description!,
                            imageUrl: course.imageUrl,
                            price: course.price,
                            isPublished: course.isPublished,
                            categoryId: course.categoryId,
                            createdAt: course.createdAt,
                            updatedAt: course.updatedAt
                        }}
                        // initialData={{ description: course.description! }} // Using non-null assertion operator to indicate that course.description will never be null
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Course Chapters
                            </h2>
                        </div>
                        <div>
                            TODO: Chapters 
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={CircleDollarSign} />
                        <h2 className="text-xl">
                            Sell your Course
                        </h2>
                    </div>
                    <PriceForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
     );
}

export default CourseIdPage;


// Course Id: {params.courseId}
